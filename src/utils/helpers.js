import { differenceInCalendarDays, formatDistance, parseISO } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInCalendarDays(
    parseISO(String(dateStr1)),
    parseISO(String(dateStr2)),
  );

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );

export const getChartData = (confirmedStays) => {
  const chartData = [
    { nights: "1 night", visitors: 0, fill: "var(--color-one)" },
    { nights: "2 nights", visitors: 0, fill: "var(--color-two)" },
    { nights: "3 nights", visitors: 0, fill: "var(--color-three)" },
    { nights: "4-5 nights", visitors: 0, fill: "var(--color-four)" },
    { nights: "6-7 nights", visitors: 0, fill: "var(--color-five)" },
    { nights: "8-14 nights", visitors: 0, fill: "var(--color-six)" },
    { nights: "15-21 nights", visitors: 0, fill: "var(--color-seven)" },
    { nights: "21+ nights", visitors: 0, fill: "var(--color-eight)" },
  ];
  confirmedStays.forEach((stay) => {
    switch (true) {
      case stay.numNights === 1:
        chartData[0].visitors += 1;
        break;
      case stay.numNights === 2:
        chartData[1].visitors += 1;
        break;
      case stay.numNights === 3:
        chartData[2].visitors += 1;
        break;
      case stay.numNights === 4 || stay.numNights === 5:
        chartData[3].visitors += 1;
        break;
      case stay.numNights === 6 || stay.numNights === 7:
        chartData[4].visitors += 1;
        break;
      case stay.numNights >= 8 && stay.numNights <= 14:
        chartData[5].visitors += 1;
        break;
      case stay.numNights >= 15 && stay.numNights <= 21:
        chartData[6].visitors += 1;
        break;
      case stay.numNights > 21:
        chartData[7].visitors += 1;
        break;
    }
  });
  return chartData.filter((data) => data.visitors > 0);
};
