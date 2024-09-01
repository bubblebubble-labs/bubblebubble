# 3. 다른 환경에서 이미지 풀
sudo docker pull wks0968/bread-app:latest

# 4. 컨테이너 실행
sudo docker run -d -p 3000:3000 wks0968/bread-app

sudo docker logs -f $(sudo docker ps -lq)
