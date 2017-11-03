echo "开始处理..."

for /R %%i in (*.png) do ( 
  pngquant --force --verbose --quality=45-85 "%%i"
  pngquant --force --verbose --ordered --speed=1 --quality=50-90 "%%i"  
)


pause