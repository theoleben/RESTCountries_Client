export function commaFormatting(array) {
  let formattedString = "";
  array.forEach((element, index) => {
    // console.log(element);
    formattedString += element;
    if (index !== array.length - 1) {
      formattedString += ", ";
    }
  });

  return formattedString;
}
