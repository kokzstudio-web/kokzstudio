// Public uploads from the channel's Videos tab, checked 2026-11-18 (no Shorts).
window.diligenceVideos = [
  ['mMUkqbu-y4s','반신욕을 하면 남자에게 안좋을까? 더운 나라 사람은 정자가 적을까?','7:56'],
  ['hGX9Q7PlgIo','남자들이 제일 무서워 하는 검사','1:40'],
  ['DHdGxmNjbvQ','트리믹스를 이제 못쓴다고?!?!?!?!?! 빨리 서두르세요!!!','5:42'],
  ['Y6lvad14_go','정자 검사할 때 이렇게 재취하면 다 죽습니다!','1:10'],
  ['1e1pE4aXilg',"'하의 탈의한 환자분이 건넨 한마디'   이러시면 안돼요!",'2:20'],
  ['JbZyyyGItpY','정액검사실에서 애인과 함께 그걸?!?!?!?','2:18'],
  ['gpfOc7ZJ9Yc','보다나온 *쭈쭈형* 여유증 수술 어떻게 해야 할까요???','2:41'],
  ['sbcB5stt4HY','20,30대 발기부전의 원인이 빈부격차???? 안타깝네요.....','5:20'],
  ['3emgMxhNUSo','문제 생기면 남성불임과 사망에 이를 수 있는 남성기관','6:40'],
  ['lVoJlyBgmIQ','"발기부전수술"하면 안되는 사람은 누구일까?','2:08'],
  ['9y9mUERHZvs','담배 못 끊으면 XX는 끊어야 합니다!','2:39'],
  ['INv9vOGD9iw','소변이 졸졸졸 나올 때 ㅣ 전립샘비대증 시술 후기','3:20'],
  ['rqSdN15o0QU','술 마시고 발기가 안된다면??','0:52'],
  ['1cF85iWvQhk','젊다고 발기부전 안생길까? #Erectile_Dysfunction','1:52'],
  ['_fV7I7m3Gzs','자전거 타면 발기력이 떨어지네요  My erection gets worse after riding a bicycle','0:38'],
  ['6J82gJ_hrwU',"밤에 화장실을 너무 자주가서 힘들어요 I often go to the bathroom at night, so it's hard",'6:02'],
  ['EXzKvcq8JS4','자전거, 남자에게 정말 안좋을까? Is Bicycle Bad for Men?','1:29'],
  ['TwqZO2G9Bn8','(sub) Premature Ejaculation vs Delayed Ejaculation 조루vs지루 뭐가 더 고민일까?','4:29'],
  ['BNPc4LMt9yc','소변을 못 참을때 주의할 점  hypersensitive bladder masturbation','4:14'],
  ['zcuov2nhXLk','STD test, 성병검사 궁금하셨죠?? 비용ㅣ종류ㅣ방법','2:53'],
  ['9m9AZoE9J6Y','템플스테이가서 친구와 속깊은 이야기ㅣ성기능 검사ㅣ정자검사','3:13'],
  ['eO9TL6Ff43M','sexual health  성기능 검사 저는 멀쩡할 줄 알았어요ㅠㅠ','7:54'],
  ['P1Tb6X7sH3A','비뇨기과 검사에 대해서 ㅣ30대ㅣ성기능검사','3:38']
].map(([videoId,title,duration],index) => ({
  videoId,title,duration,id:`DG${String(index+1).padStart(2,'0')}`,
  category:'diligence',label:'성실한 남자',source:'성실한 남자 · @diligence-365',
  alt:title,scope:duration,visibility:'public'
}));
