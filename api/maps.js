import Axios from "~/axios_config/Axios"
const geoserverBaseURL = process.env.geoserverBaseUrl
export async function geoLayerReq(obj) {
  try {
    //TODO: this is just to run the applicaiton, specified here should include the commodity type
    const params = {
      locationType: obj.layer
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
    console.log('api fetch feature req: ',obj)
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
