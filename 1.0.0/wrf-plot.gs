function main(args)
  if (args='') 
    say 'Usage: wrf-plot filename place0 lon0 lat0 times'
    return
  endif 
  filename=subwrd(args,1)
  places=subwrd(args,2)
  times=subwrd(args,3)

  say filename
  say places
  say times

  'sdfopen 'filename



  'set grads off'
  'set mpdraw on'
  'set mpdset hires'
  'set poli on'

  it=1

  while (it <=times)
    'set T 'it
    'clear'

    'query time'
    strLabel= subwrd(result,3)
    strTime = subwrd(strLabel,1)
    say 'Time:'strTime

    'set gxout shaded'
    'run tspBars.gs'
    'display t2c'
    'cbarn'

    'set rbcols'
    'set gxout barb'
    'run wndBars.gs'
    'set ccolor 2'
    'display skip(u10m,4,4);v10m;mag(u10m,v10m)*1.94'

    'set strsiz 0.15'
    'draw string 1 7.9 Forecast: ' strTime ' 10m Wind (m/s) and 2m Temp (C)'
    'set strsiz 0.2'
    'draw string 0.05 0.2 http://usefaceit.org'

    result = read(places)
    rc = sublin(result,1)
    rc = subwrd(rc,1)
    if (rc!=0)
      say 'Error reading 'places
      return
    endif
    currentLine = sublin(result,2)

    say 'currentLine: 'currentLine

    lon0 = subwrd(currentLine,1)
    lat0 = subwrd(currentLine,2)
    place0 = subwrd(currentLine,3)

    'query w2xy 'lon0' 'lat0
    x0 = subwrd(result,3)
    y0 = subwrd(result,6)
    'draw mark '5' 'x0' 'y0' '0.08
    'draw string 'x0+0.1' 'y0' 'place0

    flag = 1
    while (flag = 1)
      while (1)
        result = read(places)
        rc = sublin(result,1)
        rc = subwrd(rc,1)
        if (rc!=0)
          flag = 0
          break
        else
          currentLine = sublin(result,2)
          lon0 = subwrd(currentLine,1)
          lat0 = subwrd(currentLine,2)
          place0 = subwrd(currentLine,3)

          'query w2xy 'lon0' 'lat0
          x0 = subwrd(result,3)
          y0 = subwrd(result,6)
          'draw mark '5' 'x0' 'y0' '0.08
          'draw string 'x0+0.1' 'y0' 'place0
        endif
      endwhile
    endwhile
    rc = close(places)

    if (it < 10) 
      it000=00''it
    else if (it < 100)
      it000=0''it
    endif

    'printim ./outputs/output-' it000 '.png white x1024 y768'

    it=it+1
  endwhile

  'set T 1 'times
  'set LAT 'lat0
  'set LON 'lon0
  'set Z 11'
  'clear'
  'display t2c'
  'display psfc'
  'set strsiz 0.15'
  'draw string 1 7.9 Forecast: ' place0 ' Surface Pressure (Pa) and 2m Temp (C)'
  'set strsiz 0.2'
  'draw string 0.05 0.2 http://usefaceit.org'
  'printim ./outputs/timeseries-000-tsp.png white x1024 y768'

  'clear'
  'display cldfra'
  'display rain'
  'set strsiz 0.15'
  'draw string 1 7.9 Forecast: ' place0 ' Cloud Fraction and Accumulated Rain (mm)'
  'set strsiz 0.2'
  'draw string 0.05 0.2 http://usefaceit.org'
  'printim ./outputs/timeseries-000-crf.png white x1024 y768'
  quit
return
