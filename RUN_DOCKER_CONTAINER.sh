docker-compose -p hsr_display -f ./docker-compose.yml up -d

# wait for the server to start
while ! nc -z localhost 3000; do
  sleep 0.1
done

export DISPLAY=:0
firefox --kiosk http://localhost:3000
