const profilePictures = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqtOJwyHYsffVaKupV9U-qJndp2xN9GZ8XTQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoGy-hex8PkL-exHhiecoJg0yTBNWjGZqxA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo6wZotHgjrPC_ZG6NEPLjFTxBgGMQV4qPxQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjblZeARzi7VOQ80iM_KN55eQsX2lSmehgIw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq-TFYDJpI85aEcXbKk59DAZU-s5KO5fu8yfu9BNjxjbLjTZKlMGmSs9ERXrbM45S-xSA&usqp=CAU",
  "",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOk5zI97BUmL7XDRQg_swuXxpD8OQD6xqlhEAfgJ0eApkf12olHANi-TadDJG5IlJUlTI&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAhWO1Krrz8bS7tiTEfD-YLoTEaFFEI4SukqtPgkUrJNftu-uTzIa71nm5KbzxhQCCzxw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJpd3n_zJ1kex6kyxmSWixPLPllBqBfGp66g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhv7K4lnBGwAnSxTrC8iTccxEPJDE2krngw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuN0nL55Q214FpASOK5UjDqIwATHN6ej_Ng&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykIJwTqyQ0dg0XYDj77MJfdA11U6kv-rcmA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0boPBycg68gV2VTRB5yo0iGAVHfQFP2-KA&usqp=CAU",
];
function getRandomImage(array) {
  return array[Math.floor(Math.random() * array.length)];
}
let image = getRandomImage(profilePictures);
export default image;