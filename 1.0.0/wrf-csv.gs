function main(args)
  if (args='')
    say 'Usage: wrf-csv filename places outfile'
    return
  endif
  filename=subwrd(args,1)
  places=subwrd(args,2)
  outfile=subwrd(args,3)

  say filename
  say places
  say outfile

  'sdfopen 'filename

  'query file'
  qfr=result
  s1=sublin(qfr,5)
  times=subwrd(s1,12)
  say times

  s1= sublin(qfr,6)
  vars=subwrd(s1,5)
  say vars

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

        say 'Place: 'place0' ('lon0','lat0')'
        outfilename=outfile'_'place0'.csv'

        var=0
        outline='time,'
        while (var<vars)
          s1=sublin(qfr,7+var)
          name=subwrd(s1,1)
          outline=outline''name
          var=var+1
          if (var<vars);outline=outline','; endif
        endwhile
        if ( write_(outfilename,outline) != 0 ); return -2; endif

        time=1
        while (time<=times)
          var=0
          outline=time','
          clear
          'set T 'time
          'set Z 11'
          'set LAT 'lat0
          'set LON 'lon0
          'set gxout print'
          'set prnopts %g 1 1 u'
          while (var<vars)
            s1=sublin(qfr,7+var)
            name=subwrd(s1,1)
            'display 'name
            buffer = result
            line = sublin(buffer,2)
            outline=outline''line
            var=var+1
            if (var<vars);outline=outline','; endif
          endwhile
          if ( write_(outfilename,outline,append) != 0 ); return -3; endif 
          time=time+1
        endwhile
        if ( close(outfilename) != 0 ); return -4; endif
      endif
    endwhile
  endwhile
  quit
return

function write_(file,line)
  rc = write(file,line)
  return subwrd(rc,1)
