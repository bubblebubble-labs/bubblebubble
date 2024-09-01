#!/bin/bash

# Slack 웹훅 URL 설정
WEBHOOK_URL='https://hooks.slack.com/services/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'

# 전송할 메시지
MESSAGE="Hello, Slack!"

# JSON 페이로드 생성
PAYLOAD="{\"text\": \"$MESSAGE\"}"

# curl을 사용하여 웹훅 요청 보내기
curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" $WEBHOOK_URL