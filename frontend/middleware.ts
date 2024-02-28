import { NextResponse } from "next/server";

export function middleware(request: Request){
  const regex = new RegExp('/app/*');
  if ( regex.test('request.url')) {
    // Add your code here
  }

  console.log('middleware')
  console.log(request.method)
  console.log(request.url)

  const origin = request.headers.get('origin')
  console.log(origin)

  return NextResponse.next()
}
