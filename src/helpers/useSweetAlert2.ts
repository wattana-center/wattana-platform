import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

declare global {
  interface Window {
    PROGRESS: number
  }
}

const useSweetAlert2 = () => withReactContent(Swal)

const useWarning = () => (title: string, text: string) =>
  useSweetAlert2().fire({
    title: title,
    text: text,
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  })

const useAlertSuccess = () => (message: string) =>
  useSweetAlert2().fire({
    icon: 'success',
    title: 'Response!',
    html: message,
    timer: 5000,
    timerProgressBar: true
  })

const useAlertError = () => (message: string) =>
  useSweetAlert2().fire({ title: 'Error!', icon: 'error', html: message })

const useLoadingAlert = () => () => {
  let timerInterval: any
  useSweetAlert2().fire({
    allowOutsideClick: false,
    title: 'Please wait...',
    // html: `Loading...`,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            if (window.PROGRESS) b.textContent = `${window.PROGRESS.toFixed(0)}`
          }
        }

        if (window.PROGRESS > 100) {
          window.PROGRESS = 0
          // Swal.close()
        }
      }, 99)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  })
}
export { useWarning, useLoadingAlert, useAlertSuccess, useAlertError }

export default useSweetAlert2
