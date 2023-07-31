const capitalizeEachWord = (inputString) => {
    if(inputString === null)
    {
       return null
    }
    return inputString
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export default capitalizeEachWord;