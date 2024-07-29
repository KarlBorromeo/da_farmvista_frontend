// import axios from 'axios';
const geoserverBaseURL = process.env.geoserverBaseUrl
export async function geoserviceReq() {
  try {
    // alert(geoserverBaseURL)
    // const params = {
    //     request: 'getCapabilities',
    // }
    // const res = await axios.get(geoserverBaseURL,{
    //     params
    // })
    // console.log(res)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function featureReq() {
  try {
    console.log('requestion feature request')
  } catch (err) {
    console.error(err)
    throw err
  }
}
