// Shared-production work, in the order shown by NOTOOW's 3D portfolio.
window.threeDVideos = [
  ['Cjg20fAQUSI','멀티탭 홍보 영상'],
  ['Je54gM1ccDw','수경재배기구 제품 홍보 영상'],
  ['CH1klZAl9rA','세코어 로보스틱스 IR 피치 영상'],
  ['PmSm9-_y7O4','웨딩 반지 서핑 콘셉트 홍보 영상'],
  ['cgeUUyAz7R0','비타민 제품 홍보'],
  ['aWt8RAiKP3w','웨딩 반지 별 콘셉트 홍보 영상'],
  ['AyYL5E7OIu8','3단 폴대 박람회 영상'],
  ['iGGFvrpeRr8','공기청정기 홍보 영상'],
  ['eweX-SA06Ss','카포트 홍보 영상'],
  ['KKQbx8WNG68','스마트블라인드 홍보 영상'],
  ['9L5D72ZVLrc','노인케어로봇 홍보 영상'],
  ['VOTU-8623Co','발각질제거기 홍보 영상'],
  ['URX0C7XdF0g','파레트밴드 홍보 영상'],
  ['F2Fr5sdQDfE','Fitbot 안마기 홍보 영상']
].map(([videoId,title], index) => ({
  id:`3D${String(index+1).padStart(2,'0')}`,
  videoId, title, alt:title, category:'3d', label:'3D',
  visibility:'unlisted', source:'공동 제작 · NOTOOW'
}));
