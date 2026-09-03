

export const checkInteraction = async (req, res) => {
  const { med1, med2 } = req.body;

  try {
    // Fetch data for first medicine
    const response1 = await fetch(
      `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${med1}"&limit=100`
    );
    const data1 = await response1.json();

    // Fetch data for second medicine
    const response2 = await fetch(
      `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${med2}"&limit=100`
    );
    const data2 = await response2.json();

    // Extract adverse events
    const events1 =
      data1.results?.map(e => e.patient.reaction?.map(r => r.reactionmeddrapt)).flat() || [];
    const events2 =
      data2.results?.map(e => e.patient.reaction?.map(r => r.reactionmeddrapt)).flat() || [];

    // Find common events
    const commonEvents = events1.filter(event => events2.includes(event));

    if (commonEvents.length > 0) {
      return res.json({
        status: 'warning', // new status field
        message: '⚠ Potential interaction detected. Common reported adverse events:',
        events: [...new Set(commonEvents)], // send as array
      });
    } else {
      return res.json({
        status: 'safe', // new status field
        message: '✅ No reported adverse events in common. Interaction likely low.',
        events: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching data from OpenFDA',
      error: error.message,
    });
  }
};
