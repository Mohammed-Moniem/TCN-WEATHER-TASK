export default function getDates() {
  //Initializing date

  let today = new Date();
  let twoDaysAgoInDuration = today - 1000 * 60 * 60 * 24 * 2;
  let twoDaysAgo = new Date(twoDaysAgoInDuration);

  const DateFormatterAccordingToWeatherAPI = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();

    date = yyyy + "-" + mm + "-" + dd;

    return date;
  };

  today = DateFormatterAccordingToWeatherAPI(today);
  twoDaysAgo = DateFormatterAccordingToWeatherAPI(twoDaysAgo);

  return { today, twoDaysAgo };
}
