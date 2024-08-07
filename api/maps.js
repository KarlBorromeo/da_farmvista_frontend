import Axios from "~/axios_config/Axios"
const geoserverBaseURL = process.env.geoserverBaseUrl
export async function geoLayerReq(obj) {
  try {
    const params = {
      locationType: obj.layer,
      type: obj.type
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

export async function featureReq(obj) {
  try {
    // console.log('api fetch feature req: ',obj)
    const params = {
      locationType: obj.layer,
      type: obj.type
    } 
    const res = await Axios.get(`analytics/geolocation/${obj.gid}`,{
      params
    })
    return res.data;
    // console.log('result hereee:',res)
    // await new Promise(resolve => setTimeout(resolve,2000))
    // return {
    //   location: {
    //       province: "agusan del sur",
    //       cityMunicipality: "",
    //       barangay: ""
    //   },
    //   activeFarmerCount: 999,
    //   commonCoffeeVariety: "karl",
    //   estimatedCoffeeArea: "200 km squared",
    //   commodityPresentArea: ['ha','he','hi'],
    //   listPlacesCoffeePlantation: ['hehe','hoho','hihi','huhu']
    // }
  } catch (err) {
    console.error(err)
    throw err
  }
}
