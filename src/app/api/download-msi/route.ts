import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Replace this path with the actual path to your .msi file
    const filePath = path.join(process.cwd(), 'public', 'framehub_0.1.0_x64_en-US.msi')
    const fileBuffer = fs.readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename=framehub_0.1.0_x64_en-US.msi',
        'Content-Type': 'application/x-msi',
      },
    })
  } catch (error) {
    console.error('Error serving .msi file:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}