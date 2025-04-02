import axios from "axios";

const handleSignUp = async ({ endpoint, data }) => {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export { handleSignUp };
