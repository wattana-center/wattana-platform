import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api'
import { Button, Grid, Typography } from '@mui/material'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useEffect, useState } from 'react'

import BusinessApi from '@app/apis/business-api'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'

type ManageLocationProps = {
  data: BusinessResponseGet
}

const ManageLocation: React.FC<ManageLocationProps> = ({ data }) => {
  const authUsers = useAuthUser()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()

  const [autocomplete, setAutocomplete] = useState<any>(null)
  const [center, setCenter] = useState({
    lat: 13.7245601,
    lng: 100.4930288
  })
  const [zoom] = useState(11)

  const [marker, setMarker] = useState({
    lat: 13.7245601,
    lng: 100.4930288
  })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBFpr6uzPGENaVmBbWdRcPdrBNxzhn08hU',
    libraries: ['places']
  })

  const onLoad = (autocomplete: any) => {
    console.log('autocomplete: ', autocomplete)
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      if (place) {
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  const handleOnSummit = async () => {
    const token = await authUsers.getIdToken()

    if (token) {
      loadingAlert()
      const businessApi = new BusinessApi({ token: token })
      await businessApi
        .update(
          {
            ...data,
            latitude: marker.lat,
            longitude: marker.lng
          },
          `${data.id}`
        )
        .then(() => {
          alertSuccess(`บันทึกข้อมูลเรียบร้อย`)
        })
        .catch((error) => {
          alertError(`${error.message}`)
        })
    }
  }

  useEffect(() => {
    if (data.latitude != 0 && data.longitude != 0) {
      setCenter({
        lat: data.latitude,
        lng: data.longitude
      })
      setMarker({
        lat: data.latitude,
        lng: data.longitude
      })
    }
  }, [data])

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography>ตำแหน่งที่พัก</Typography>
        </Grid>
        <Grid item>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                height: '600px',
                width: '100%'
              }}
              center={center}
              zoom={zoom}
              onClick={(event) => {
                setMarker({
                  lat: event.latLng?.lat() || 0,
                  lng: event.latLng?.lng() || 0
                })
              }}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="ค้นหาสถานที่"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `392px`,
                    height: `46px`,
                    padding: `12px 12px`,
                    borderRadius: '4px',
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `16px`,
                    outline: `none`,
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-120px',
                    marginTop: '10px'
                  }}
                />
              </Autocomplete>
              <Marker position={{ lat: marker.lat, lng: marker.lng }} />
            </GoogleMap>
          ) : null}
        </Grid>
        <Grid item>
          <Button variant="contained" fullWidth onClick={handleOnSummit}>
            บันทึกตำแหน่งที่พัก
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthUser<ManageLocationProps>()(ManageLocation)
