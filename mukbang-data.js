// Public food videos from @yoonjangkeum, checked 2026-10-07.
window.mukbangVideos = [
  ['_GTT2s-wYcY',"안양중앙시장 곱창골목 '호계동집' | 백반기행에 소개된 맛집🤤 | 단골집사장님고민상담 토크삼매경✨ | 안양토박이들은 다아는 골목┃Korean Street Food",'9:26'],
  ['A3SCqC8RlzA','순대국먹방 꿀팁대방출😋 오늘점심엔 순대국 어떠세요?! 순대국에 김치, 오소리감투 곁들여서 한끼뚝딱! Korean food / Real Mukbang','4:22'],
  ['vH2BXul7wKE','✨삼각김밥✨ 뜯는법 triangle kimbap | 따라해보세요★','4:16'],
  ['4MobnxprfcA','안양중앙시장 Vlog (족발,뻥튀기,생선가게,떡볶이) | 시장투어하는장금이','3:24'],
  ['Tzo8t0IUtpM','죽집 사장님이 알려주신 죽 맛있게먹는법🥣 안양시골죽집 호박죽🎃 팥죽🫘 할머니손맛 제대로 맛보기😋','5:02'],
  ['FDxjDe28YPY','순대국먹방 꿀팁대방출😋 오늘점심엔 순대국 어떠세요?! 순대국에 김치, 오소리감투 곁들여서 한끼뚝딱! Korean food / Real Mukbang','7:46'],
  ['z_cETEqPM7U','시장음식먹방 😋 진짜 유명한 떡볶이골목 쌀떡복이 소개! 순대, 어묵국물, 약과까지 먹어봄 Korean food / Real Mukbang','5:56'],
  ['fYFHNQvcb80','시장 길거리 음식 먹방리뷰 🔥 안양중앙시장표 김밥, 닭강정, 풀빵, 전통과자 소개하기 (선택적 소식좌) Street Foods Mukbang','12:48']
].map(([videoId,title,duration],index) => ({
  videoId,title,duration,id:`MB${String(index+1).padStart(2,'0')}`,
  category:'mukbang',label:'먹방',alt:title,source:'윤장금',visibility:'public'
})).concat([
  ['eHUWEN6sDTw','포크 소리 시끄럽다고 엄마한테 혼나서 고추로 샐러드 먹는중ㅋㅋㅋㅋㅋㅋ'],
  ['omFoEucNz8g','요아정 집에서 아주아주 쉽게 만들어서 먹는법 / 초초초초간단해요🫶'],
  ['6l8G-3GFaPs','반숙란으로 간장계란밥 만드는 ASMR / 입맛없고 심심할때 보세요 :)'],
  ['NqDErwkjj-A','찐단골집 왕누룽집!! 진짜 꼭 드셔보세요~ 완전커요!! #안양중앙시장 #누룽지맛집 #누룽지 #koreanfood #시장음식 #길거리음식 #ricesnack'],
  ['KMKcNWHfY3c','완전 크고 바로 만들어서 말랑말랑한 누룽지😋 구수하고 쫄깃하고 바삭하고 맛있어요. 한번 드셔보세요! #안양중앙시장 #누룽지 #시장구경 #핫플레이스 #시장음식소개 #mukbang'],
  ['VjYQQ0OV4Cg','전복삼계탕집 점심특선🥘 푸짐하고! 개운하고! #맛집공유 #안양삼덕공원맛집 #안양중앙시장 #먹방브이로그 #먹방리뷰 #해장국맛집 #mukbang #seafood #koreanfood'],
  ['L7Da0BYq5oU','시장줄서는 칼국수집💛 #길거리음식 #먹방 #먹방리뷰 #먹방브이로그 #시장구경 #mukbang #시장맛집 #시장맛집투어'],
  ['QhigqwD900w','시장에서 풀빵사는 중💛 #풀빵 #길거리음식 #시장구경 #koreanstreetfood']
].map(([videoId,title],index) => ({
  videoId,title,duration:'SHORTS',id:`MS${String(index+1).padStart(2,'0')}`,
  category:'mukbang',label:'먹방 SHORTS',alt:title,source:'윤장금',visibility:'public',kind:'short'
})));
