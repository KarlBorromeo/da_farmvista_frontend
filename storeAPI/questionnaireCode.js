import axios from 'axios'
const baseURL = process.env.baseUrlApi;

export async function fetchAllCodes(commodity) {
    console.log(commodity)
    const encodedType = encodeURIComponent(commodity)
  try {
        console.log(commodity,baseURL+`survey/codes?type=${encodedType}`);
       const response = await axios.get(baseURL+`survey/codes?type=${commodity}`,{});
       console.log(response);
  }catch (error) {
    console.error(error)
  }
}
