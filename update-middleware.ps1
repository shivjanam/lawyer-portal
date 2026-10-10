$content = Get-Content -Raw "D:\projects\Lawer\lawyer-portal\advocate-pro\apps\web\middleware.ts"
$content = $content -replace 'matcher: \[.*?\]', 'matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*).*"]'
$content = $content -replace 'export const config = \{', "export const config = {
  matcher: [""/((?!api|_next/static/_next/image|favicon.ico|robots.txt).*).*""],"
Set-Content -Path "D:\projects\Lawer\lawyer-portal\advocate-pro\apps\web\middleware.ts" -Value $content -NoNewline