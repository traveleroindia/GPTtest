export async function POST(req) {
    try {
      const db = await connectDB();
      const body = await req.json();
      const userId = req.user.id; // Assume user ID is obtained from token validation
  
      // Optionally check if the alternate number already exists
      const existingPhoneCheck = 'SELECT COUNT(*) FROM user WHERE phone = ?';
      const [checkResult] = await db.query(existingPhoneCheck, [body.alternateNumber]);
      if (checkResult[0]['COUNT(*)'] > 0) {
        return NextResponse.json({ error: 'Phone number is already taken' }, { status: 409 });
      }
  
      // Update the user's record with the alternate phone number
      const updateQuery = 'UPDATE user SET alternate_phone = ? WHERE id = ?';
      await db.query(updateQuery, [body.alternateNumber, userId]);
  
      return NextResponse.json({ message: 'Alternate number added successfully' }, { status: 200 });
  
    } catch (error) {
      console.error('Error adding alternate number:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }