import Encryption from '@app/utils/crypto'

if (
  process.env.ALGORITHM == null ||
  process.env.ENCRYPTION_KEY == null ||
  process.env.SALT == null ||
  process.env.IV == null
) {
  throw new Error("can't get env config")
}

const config = {
  algorithm: process.env.ALGORITHM,
  encryptionKey: process.env.ENCRYPTION_KEY,
  salt: process.env.SALT,
  iv: process.env.IV
}

const useEncryption = () => new Encryption(config)

export default useEncryption
