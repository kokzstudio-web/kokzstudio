$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetDirectory = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../assets'))

function New-BrandIcon([int]$size) {
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#0c0c0c'))
    $yellow = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#f5e642'))
    $white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
    $outline = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#0c0c0c'), [single]($size * 6 / 64))
    $outline.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $scale = $size / 64.0
    $points = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new(27 * $scale, 20 * $scale),
        [System.Drawing.PointF]::new(44 * $scale, 32 * $scale),
        [System.Drawing.PointF]::new(27 * $scale, 44 * $scale)
    )
    $graphics.FillEllipse($yellow, [single](8 * $scale), [single](8 * $scale), [single](48 * $scale), [single](48 * $scale))
    $graphics.FillPolygon($white, $points)
    $graphics.DrawPolygon($outline, $points)
    $outline.Dispose()
    $yellow.Dispose()
    $white.Dispose()
    $graphics.Dispose()
    return $bitmap
}

foreach ($item in @(@{Size=32; Name='favicon-32.png'}, @{Size=180; Name='apple-touch-icon.png'})) {
    $bitmap = New-BrandIcon $item.Size
    try { $bitmap.Save((Join-Path $assetDirectory $item.Name), [System.Drawing.Imaging.ImageFormat]::Png) }
    finally { $bitmap.Dispose() }
}

# ICO entries contain PNG data at several sizes to keep small tabs crisp.
$entries = foreach ($size in @(16, 32, 48, 256)) {
    $bitmap = New-BrandIcon $size
    $stream = [System.IO.MemoryStream]::new()
    try {
        $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
        @{Size=$size; Bytes=$stream.ToArray()}
    } finally { $bitmap.Dispose(); $stream.Dispose() }
}
$output = [System.IO.File]::Create((Join-Path $assetDirectory 'favicon.ico'))
$writer = [System.IO.BinaryWriter]::new($output)
try {
    $writer.Write([uint16]0)
    $writer.Write([uint16]1)
    $writer.Write([uint16]$entries.Count)
    $offset = 6 + 16 * $entries.Count
    foreach ($entry in $entries) {
        $dimension = if ($entry.Size -eq 256) { 0 } else { $entry.Size }
        $writer.Write([byte]$dimension)
        $writer.Write([byte]$dimension)
        $writer.Write([byte]0)
        $writer.Write([byte]0)
        $writer.Write([uint16]1)
        $writer.Write([uint16]32)
        $writer.Write([uint32]$entry.Bytes.Length)
        $writer.Write([uint32]$offset)
        $offset += $entry.Bytes.Length
    }
    foreach ($entry in $entries) { $writer.Write([byte[]]$entry.Bytes) }
} finally { $writer.Dispose(); $output.Dispose() }
