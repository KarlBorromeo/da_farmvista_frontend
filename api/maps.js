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

export async function featureReq(gid) {
  try {
    await new Promise(resolve => setTimeout(resolve,2000))
    return {
      location: {
          province: "agusan del sur",
          cityMunicipality: "",
          barangay: ""
      },
      activeFarmerCount: 999,
      commonCoffeeVariety: "karl",
      estimatedCoffeeArea: "200 km squared",
      commodityPresentArea: ['ha','he','hi'],
      listPlacesCoffeePlantation: ['hehe','hoho','hihi','huhu']
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
