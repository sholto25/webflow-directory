// /netlify/functions/get-partner.js

export async function handler(event, context) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = 'appwJrhcGciSFXa3W';
  const tableName = 'Partner Companies';
  const recordId = 'recqFcj07pS0zkXzC'; // Static test record

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch data from Airtable' })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err.message })
    };
  }
}
