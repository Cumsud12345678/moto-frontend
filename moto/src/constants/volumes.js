export const volumes = () => {
  const volumes = Array.from({ length: 3000/50 + 1 }, (_, index) => index * 50)
  return(
    volumes
  )
}
