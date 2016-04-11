#! /bin/bash

if [ -z "$PACKAGE_BASE" ];
then
  # For testing purposes
  export PACKAGE_BASE="/mnt/galaxyTools/wrf/1.0.0"
  echo "Setting PACKAGE_BASE=$PACKAGE_BASE"
fi

export WRF_VERSION=wrf-3.7.1
export WRF_ROOT=$PACKAGE_BASE/$WRF_VERSION

export PATH=$PACKAGE_BASE:$PATH

export EXT_HOME=$WRF_ROOT/ext
export PATH=$EXT_HOME/bin:$PATH
export LD_LIBRARY_PATH=$EXT_HOME/lib:$LD_LIBRARY_PATH

export CPPFLAGS="-I${EXT_HOME}/include" 
export LDFLAGS="-L${EXT_HOME}/lib" 
export LD_LIBRARY_PATH="${EXT_HOME}/lib:$LD_LIBRARY_PATH"
export LIBS="-lnetcdf -lnetcdff -lhdf5_hl -lhdf5 -lz -lcurl" 

export NETCDF=$EXT_HOME

export GASCRP=$PACKAGE_BASE/data/grads/scripts/
