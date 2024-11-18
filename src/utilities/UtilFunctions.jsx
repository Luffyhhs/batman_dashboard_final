import { PHOTO_BASE_URL } from "./Api";

export const dateFormatChange = (date) => {
  // console.log(date);
  if (!date) return "";
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  // console.log(`${day}-${month}-${year}`);
  return `${day}-${month}-${year}`;
};

export const handleCopyAll = async (text = "", setIsCopied = () => {}) => {
  try {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const timeFormatChange = (date) => {
  const dateObj = new Date(date);

  // Get the local time in the user's timezone
  const localTime = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  });
  return localTime;
};

export const expireToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// export const photoUrlFix = (array, folder, attributes) => {
//   return array.map((item) => {
//     let updatedItem = { ...item };
//     attributes.forEach((attribute) => {
//       if (item.hasOwnProperty(attribute)) {
//         updatedItem[attribute] = PHOTO_BASE_URL + folder + item[attribute];
//       }
//     });
//     return updatedItem;
//   });
// };
// export const photoUrlFix = (data, folderAttributes) => {
//   return data.map((item) => {
//     let updatedItem = { ...item };

//     folderAttributes.forEach(({ folder, attributes }) => {
//       attributes.forEach((attribute) => {
//         const attributeParts = attribute.split(".");
//         if (
//           attributeParts.length === 2 &&
//           Array.isArray(item[attributeParts[0]])
//         ) {
//           // Handle the case where the attribute is nested within an array
//           const arrayName = attributeParts[0];
//           const nestedAttribute = attributeParts[1];

//           updatedItem[arrayName] = item[arrayName].map((nestedItem) => {
//             let updatedNestedItem = { ...nestedItem };
//             if (nestedItem.hasOwnProperty(nestedAttribute)) {
//               updatedNestedItem[nestedAttribute] =
//                 PHOTO_BASE_URL + folder + nestedItem[nestedAttribute];
//             }
//             return updatedNestedItem;
//           });
//         } else if (item.hasOwnProperty(attribute)) {
//           // Handle the case where the attribute is not nested
//           updatedItem[attribute] = PHOTO_BASE_URL + folder + item[attribute];
//         }
//       });
//     });

//     return updatedItem;
//   });
// };

export const photoUrlFix = (data, folderAttributes) => {
  const processItem = (item) => {
    let updatedItem = { ...item };

    folderAttributes.forEach(({ folder, attributes }) => {
      attributes.forEach((attribute) => {
        const attributeParts = attribute.split(".");
        if (
          attributeParts.length === 2 &&
          Array.isArray(item[attributeParts[0]])
        ) {
          // Handle the case where the attribute is nested within an array
          const arrayName = attributeParts[0];
          const nestedAttribute = attributeParts[1];

          updatedItem[arrayName] = item[arrayName].map((nestedItem) => {
            let updatedNestedItem = { ...nestedItem };
            if (nestedItem.hasOwnProperty(nestedAttribute)) {
              updatedNestedItem[nestedAttribute] =
                PHOTO_BASE_URL + folder + nestedItem[nestedAttribute];
            }
            return updatedNestedItem;
          });
        } else if (item.hasOwnProperty(attribute)) {
          // Handle the case where the is not nested
          updatedItem[attribute] = PHOTO_BASE_URL + folder + item[attribute];
        }
      });
    });

    return updatedItem;
  };

  if (Array.isArray(data)) {
    return data.map(processItem);
  } else if (typeof data === "object" && data !== null) {
    return processItem(data);
  } else {
    throw new Error("Invalid data type. Expected an array or an object.");
  }
};

const fetchFileFromUrl = async (url) => {
  const response = await fetch(url);
  // console.log(response);
  const blob = await response.blob();
  return blob;
};
export const base64Changer = async (values, attributes) => {
  const updatedValues = { ...values };
  // console.log(updatedValues);
  for (const attribute of attributes) {
    if (values.hasOwnProperty(attribute)) {
      if (values[attribute] instanceof File) {
        updatedValues[attribute] = await toBase64(values[attribute]);
      } else {
        const fileBlob = await fetchFileFromUrl(values[attribute]);
        updatedValues[attribute] = await toBase64(fileBlob);
      }
    }
  }
  return updatedValues;
};
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const generateQueryString = (searchInputs) => {
  const queryParams = [];

  for (const key in searchInputs) {
    if (
      searchInputs.hasOwnProperty(key) &&
      searchInputs[key] !== null &&
      searchInputs[key] !== ""
    ) {
      queryParams.push(`${key}=${encodeURIComponent(searchInputs[key])}`);
    }
  }

  return queryParams.length > 0 ? `${queryParams.join("&")}` : "";
};

export const transformSearchParams = (params) => {
  const transformedParams = { ...params };
  if (params.fromDate) {
    transformedParams["createdAt[gte]"] = params.fromDate;
    delete transformedParams.fromDate;
  }
  if (params.toDate) {
    transformedParams["createdAt[lte]"] = params.toDate;
    delete transformedParams.toDate;
  }
  return transformedParams;
};
