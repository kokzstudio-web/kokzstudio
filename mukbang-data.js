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
}));
