# BGL (Game List)

## 사용기술

- HTML
- CSS
- JAVASCRIPT
- REACT
- FIREBASE

## 디자인 툴

- MUI

## 배포 링크

https://firstaple.github.io/best-game-list

## 주요 기능

1. Home
   - Video Game Database RAWG (API) : 메인화면에 게임리스트를 MUI-CARD를 이용하여 표출
   - Skellton (MUI)를 사용하여 details의 값을 다 받아오지 않았을때 레이아웃 제공
   - Search시 API 메소드를 변경하여 원하는 게임 검색
   - 마우스 휠이 바닥에 닿았음을 감지하였을때 API의 NEXT를 가져옴
2. Details
   - Details API를 새로 받아와서 선택한 Game과 API의 ID가 같은 경우를 받아옴
   - FIRESTORE를 이용하여 리뷰란 작성
   - Review 삭제시 비밀번호 확인을 위해 Review작성시 포함된 passWord와 값 비
