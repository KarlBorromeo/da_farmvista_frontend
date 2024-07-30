import Axios from "~/axios_config/Axios"
const geoserverBaseURL = process.env.geoserverBaseUrl
export async function geoLayerReq(layer) {
  try {
    // alert(geoserverBaseURL)
    const params = {
      locationType: layer
    }
    const res = await Axios.get('geoserver/wfs/feature',{
      params
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}
// export async function geoserviceReq() {
//   // try {
//   //   // alert(geoserverBaseURL)
//   //   const params = {
//   //       request: 'getCapabilities',
//   //   }
//   //   const res = await axios.get('http://localhost:8081/geoserver/farmvista/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=farmvista%3Aregion_boundaries&outputFormat=application%2Fjson')
//   //   console.log(res)

//   // } catch (err) {
//   //   console.error(err)
//   //   throw err
//   // }
// }

// export async function featureReq() {
//   try {
//     console.log('requestion feature request')
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }
