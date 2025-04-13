import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const QuantumEnergyChart = () => {
  const [activeView, setActiveView] = useState('comparison');
  const [data, setData] = useState([]);
  const [animated, setAnimated] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Embedded data from the tuple datasets
  const aiMOFData = `MOF,"(x,y)"
gen-mof-1,"(0, 0.08997118927432514)"
gen-mof-1,"(1, 0.07064828725500749)"
gen-mof-1,"(2, 0.050923979253809984)"
gen-mof-1,"(3, 0.030918987828095884)"
gen-mof-1,"(4, 0.010760738517836046)"
gen-mof-1,"(5, -0.009419906619012232)"
gen-mof-1,"(6, -0.029492086086046004)"
gen-mof-1,"(7, -0.04932835515068484)"
gen-mof-1,"(8, -0.06880789299886735)"
gen-mof-1,"(9, -0.08781933359100147)"
gen-mof-1,"(10, -0.1062630883948478)"
gen-mof-1,"(11, -0.1240530741626184)"
gen-mof-1,"(12, -0.14111780762980158)"
gen-mof-1,"(13, -0.15740087572524153)"
gen-mof-1,"(14, -0.17286082988912188)"
gen-mof-1,"(15, -0.18747058326554994)"
gen-mof-1,"(16, -0.2012164084985865)"
gen-mof-1,"(17, -0.21409664185301605)"
gen-mof-1,"(18, -0.22612019786594453)"
gen-mof-1,"(19, -0.23730498991033)"
gen-mof-1,"(20, -0.24767633837624717)"
gen-mof-1,"(21, -0.2572654319898513)"
gen-mof-1,"(22, -0.2661078910619361)"
gen-mof-1,"(23, -0.2742424656619693)"
gen-mof-1,"(24, -0.28170988781281125)"
gen-mof-1,"(25, -0.28855188530317555)"
gen-mof-1,"(26, -0.2948103557634071)"
gen-mof-1,"(27, -0.3005266931310109)"
gen-mof-1,"(28, -0.305741254270015)"
gen-mof-1,"(29, -0.31049295094646423)"
gen-mof-1,"(30, -0.31481895122380954)"
gen-mof-1,"(31, -0.31875447426847453)"
gen-mof-1,"(32, -0.32233266323148324)"
gen-mof-1,"(33, -0.3255845220337442)"
gen-mof-1,"(34, -0.3285389033220861)"
gen-mof-1,"(35, -0.3312225364231488)"
gen-mof-1,"(36, -0.3336600856897982)"
gen-mof-1,"(37, -0.33587423113344717)"
gen-mof-1,"(38, -0.3378857646179609)"
gen-mof-1,"(39, -0.3397136961308821)"
gen-mof-1,"(40, -0.34137536573547966)"
gen-mof-1,"(41, -0.34288655774341925)"
gen-mof-1,"(42, -0.3442616144405511)"
gen-mof-1,"(43, -0.34551354735947165)"
gen-mof-1,"(44, -0.3466541446362596)"
gen-mof-1,"(45, -0.3476940734299337)"
gen-mof-1,"(46, -0.34864297673614836)"
gen-mof-1,"(47, -0.34950956420500356)"
gen-mof-1,"(48, -0.35030169678885664)"
gen-mof-1,"(49, -0.35102646521057956)"
gen-mof-1,"(50, -0.3516902623652636)"
gen-mof-1,"(51, -0.35229884985703586)"
gen-mof-1,"(52, -0.3528574189342488)"
gen-mof-1,"(53, -0.3533706461265731)"
gen-mof-1,"(54, -0.353842743911151)"
gen-mof-1,"(55, -0.35427750674585395)"
gen-mof-1,"(56, -0.3546783528089306)"
gen-mof-1,"(57, -0.3550483617784897)"
gen-mof-1,"(58, -0.35539030897429524)"
gen-mof-1,"(59, -0.3557066961698878)"
gen-mof-1,"(60, -0.35599977936628396)"
gen-mof-1,"(61, -0.35627159380042533)"
gen-mof-1,"(62, -0.35652397644284795)"
gen-mof-1,"(63, -0.3567585862202999)"
gen-mof-1,"(64, -0.3569769221806074)"
gen-mof-1,"(65, -0.3571803397992922)"
gen-mof-1,"(66, -0.357370065610458)"
gen-mof-1,"(67, -0.3575472103284044)"
gen-mof-1,"(68, -0.3577127806113905)"
gen-mof-1,"(69, -0.35786768960496085)"
gen-mof-1,"(70, -0.35801276638928126)"
gen-mof-1,"(71, -0.3581487644429931)"
gen-mof-1,"(72, -0.35827636922512346)"
gen-mof-1,"(73, -0.3583962049665827)"
gen-mof-1,"(74, -0.35850884075362865)"
gen-mof-1,"(75, -0.35861479597737983)"
gen-mof-1,"(76, -0.3587145452159214)"
gen-mof-1,"(77, -0.3588085226087256)"
gen-mof-1,"(78, -0.35889712577694377)"
gen-mof-1,"(79, -0.35898071933756315)"
gen-mof-1,"(80, -0.35905963805441365)"
gen-mof-1,"(81, -0.35913418966449634)"
gen-mof-1,"(82, -0.35920465741405183)"
gen-mof-1,"(83, -0.35927130233515125)"
gen-mof-1,"(84, -0.35933436529032)"
gen-mof-1,"(85, -0.3593940688097847)"
gen-mof-1,"(86, -0.35945061874330364)"
gen-mof-1,"(87, -0.359504205746202)"
gen-mof-1,"(88, -0.3595550066171246)"
gen-mof-1,"(89, -0.35960318550314935)"
gen-mof-1,"(90, -0.3596488949862182)"
gen-mof-1,"(91, -0.35969227706335166)"
gen-mof-1,"(92, -0.3597334640317634)"
gen-mof-1,"(93, -0.35977257928880796)"
gen-mof-1,"(94, -0.35980973805561633)"
gen-mof-1,"(95, -0.3598450480323312)"
gen-mof-1,"(96, -0.3598786099919994)"
gen-mof-1,"(97, -0.3599105183194217)"
gen-mof-1,"(98, -0.3599408615005911)"
gen-mof-1,"(99, -0.35996972256773796)"`;

  const existingMOFData = `MOF,"(x,y)"
str_m1_o10_o18_pcu_sym.166,"(0, 0.20024977528374482)"
str_m1_o10_o18_pcu_sym.166,"(1, 0.18576815821199033)"
str_m1_o10_o18_pcu_sym.166,"(2, 0.17033308063615993)"
str_m1_o10_o18_pcu_sym.166,"(3, 0.15396177273554432)"
str_m1_o10_o18_pcu_sym.166,"(4, 0.1366882408872071)"
str_m1_o10_o18_pcu_sym.166,"(5, 0.11856455730593637)"
str_m1_o10_o18_pcu_sym.166,"(6, 0.09966157314612806)"
str_m1_o10_o18_pcu_sym.166,"(7, 0.08006891249647075)"
str_m1_o10_o18_pcu_sym.166,"(8, 0.05989413708474098)"
str_m1_o10_o18_pcu_sym.166,"(9, 0.039261022151065034)"
str_m1_o10_o18_pcu_sym.166,"(10, 0.018306949895382202)"
str_m1_o10_o18_pcu_sym.166,"(11, -0.002820497948533368)"
str_m1_o10_o18_pcu_sym.166,"(12, -0.023967591269731026)"
str_m1_o10_o18_pcu_sym.166,"(13, -0.044978923454539244)"
str_m1_o10_o18_pcu_sym.166,"(14, -0.06570203459712633)"
str_m1_o10_o18_pcu_sym.166,"(15, -0.08599189723758882)"
str_m1_o10_o18_pcu_sym.166,"(16, -0.10571498681086285)"
str_m1_o10_o18_pcu_sym.166,"(17, -0.12475269908231441)"
str_m1_o10_o18_pcu_sym.166,"(18, -0.14300394014219114)"
str_m1_o10_o18_pcu_sym.166,"(19, -0.16038679177402396)"
str_m1_o10_o18_pcu_sym.166,"(20, -0.1768392354706609)"
str_m1_o10_o18_pcu_sym.166,"(21, -0.1923189918894839)"
str_m1_o10_o18_pcu_sym.166,"(22, -0.20680259123585712)"
str_m1_o10_o18_pcu_sym.166,"(23, -0.22028382934299776)"
str_m1_o10_o18_pcu_sym.166,"(24, -0.2327717829543509)"
str_m1_o10_o18_pcu_sym.166,"(25, -0.24428855776004543)"
str_m1_o10_o18_pcu_sym.166,"(26, -0.2548669279737884)"
str_m1_o10_o18_pcu_sym.166,"(27, -0.26454800150275776)"
str_m1_o10_o18_pcu_sym.166,"(28, -0.273379014908499)"
str_m1_o10_o18_pcu_sym.166,"(29, -0.28141133154950404)"
str_m1_o10_o18_pcu_sym.166,"(30, -0.28869868765351603)"
str_m1_o10_o18_pcu_sym.166,"(31, -0.29529570656579995)"
str_m1_o10_o18_pcu_sym.166,"(32, -0.3012566820032928)"
str_m1_o10_o18_pcu_sym.166,"(33, -0.30663461694802285)"
str_m1_o10_o18_pcu_sym.166,"(34, -0.31148049541642386)"
str_m1_o10_o18_pcu_sym.166,"(35, -0.3158427590079147)"
str_m1_o10_o18_pcu_sym.166,"(36, -0.31976695800458843)"
str_m1_o10_o18_pcu_sym.166,"(37, -0.3232955470121166)"
str_m1_o10_o18_pcu_sym.166,"(38, -0.3264677969399524)"
str_m1_o10_o18_pcu_sym.166,"(39, -0.3293197978888668)"
str_m1_o10_o18_pcu_sym.166,"(40, -0.33188453076006186)"
str_m1_o10_o18_pcu_sym.166,"(41, -0.33419198877000356)"
str_m1_o10_o18_pcu_sym.166,"(42, -0.3362693333101032)"
str_m1_o10_o18_pcu_sym.166,"(43, -0.33814107158318596)"
str_m1_o10_o18_pcu_sym.166,"(44, -0.33982924610098086)"
str_m1_o10_o18_pcu_sym.166,"(45, -0.3413536284095091)"
str_m1_o10_o18_pcu_sym.166,"(46, -0.3427319113261248)"
str_m1_o10_o18_pcu_sym.166,"(47, -0.3439798955473247)"
str_m1_o10_o18_pcu_sym.166,"(48, -0.3451116677557544)"
str_m1_o10_o18_pcu_sym.166,"(49, -0.34613976835818305)"
str_m1_o10_o18_pcu_sym.166,"(50, -0.3470753477641306)"
str_m1_o10_o18_pcu_sym.166,"(51, -0.34792831070554825)"
str_m1_o10_o18_pcu_sym.166,"(52, -0.34870744853603775)"
str_m1_o10_o18_pcu_sym.166,"(53, -0.3494205597637623)"
str_m1_o10_o18_pcu_sym.166,"(54, -0.3500745592912107)"
str_m1_o10_o18_pcu_sym.166,"(55, -0.3506755769788482)"
str_m1_o10_o18_pcu_sym.166,"(56, -0.35122904623611323)"
str_m1_o10_o18_pcu_sym.166,"(57, -0.3517397833864604)"
str_m1_o10_o18_pcu_sym.166,"(58, -0.3522120585646845)"
str_m1_o10_o18_pcu_sym.166,"(59, -0.3526496588934944)"
str_m1_o10_o18_pcu_sym.166,"(60, -0.35305594465932283)"
str_m1_o10_o18_pcu_sym.166,"(61, -0.35343389916993573)"
str_m1_o10_o18_pcu_sym.166,"(62, -0.35378617293269304)"
str_m1_o10_o18_pcu_sym.166,"(63, -0.35411512274526347)"
str_m1_o10_o18_pcu_sym.166,"(64, -0.35442284624248316)"
str_m1_o10_o18_pcu_sym.166,"(65, -0.3547112123954002)"
str_m1_o10_o18_pcu_sym.166,"(66, -0.35498188841250244)"
str_m1_o10_o18_pcu_sym.166,"(67, -0.3552363634493606)"
str_m1_o10_o18_pcu_sym.166,"(68, -0.3554759694919162)"
str_m1_o10_o18_pcu_sym.166,"(69, -0.35570189974061295)"
str_m1_o10_o18_pcu_sym.166,"(70, -0.355915224787603)"
str_m1_o10_o18_pcu_sym.166,"(71, -0.35611690684734637)"
str_m1_o10_o18_pcu_sym.166,"(72, -0.35630781227195096)"
str_m1_o10_o18_pcu_sym.166,"(73, -0.35648872255645025)"
str_m1_o10_o18_pcu_sym.166,"(74, -0.3566603440156816)"
str_m1_o10_o18_pcu_sym.166,"(75, -0.35682331629335884)"
str_m1_o10_o18_pcu_sym.166,"(76, -0.3569782198451019)"
str_m1_o10_o18_pcu_sym.166,"(77, -0.35712558252041077)"
str_m1_o10_o18_pcu_sym.166,"(78, -0.357265885353665)"
str_m1_o10_o18_pcu_sym.166,"(79, -0.35739956766100905)"
str_m1_o10_o18_pcu_sym.166,"(80, -0.3575270315282705)"
str_m1_o10_o18_pcu_sym.166,"(81, -0.3576486457647181)"
str_m1_o10_o18_pcu_sym.166,"(82, -0.3577647493883249)"
str_m1_o10_o18_pcu_sym.166,"(83, -0.35787565470015975)"
str_m1_o10_o18_pcu_sym.166,"(84, -0.3579816499984225)"
str_m1_o10_o18_pcu_sym.166,"(85, -0.3580830019764243)"
str_m1_o10_o18_pcu_sym.166,"(86, -0.3581799578433082)"
str_m1_o10_o18_pcu_sym.166,"(87, -0.35827274720151076)"
str_m1_o10_o18_pcu_sym.166,"(88, -0.35836158371072535)"
str_m1_o10_o18_pcu_sym.166,"(89, -0.35844666656443414)"
str_m1_o10_o18_pcu_sym.166,"(90, -0.3585281818018215)"
str_m1_o10_o18_pcu_sym.166,"(91, -0.3586063034750378)"
str_m1_o10_o18_pcu_sym.166,"(92, -0.35868119468929527)"
str_m1_o10_o18_pcu_sym.166,"(93, -0.35875300853109093)"
str_m1_o10_o18_pcu_sym.166,"(94, -0.35882188889795147)"
str_m1_o10_o18_pcu_sym.166,"(95, -0.3588879712414188)"
str_m1_o10_o18_pcu_sym.166,"(96, -0.3589513832335407)"
str_m1_o10_o18_pcu_sym.166,"(97, -0.3590122453658559)"
str_m1_o10_o18_pcu_sym.166,"(98, -0.3590706714887406)"
str_m1_o10_o18_pcu_sym.166,"(99, -0.3591267692980209)"
str_m2_o1_o1_pcu_sym.13,"(0, 0.12776841043104334)"
str_m2_o1_o1_pcu_sym.13,"(1, 0.11607220306076585)"
str_m2_o1_o1_pcu_sym.13,"(2, 0.10395150279729623)"
str_m2_o1_o1_pcu_sym.13,"(3, 0.09142539596124347)"
str_m2_o1_o1_pcu_sym.13,"(4, 0.07851830930014936)"
str_m2_o1_o1_pcu_sym.13,"(5, 0.06526005641905591)"
str_m2_o1_o1_pcu_sym.13,"(6, 0.051685744823881635)"
str_m2_o1_o1_pcu_sym.13,"(7, 0.03783553304109616)"
str_m2_o1_o1_pcu_sym.13,"(8, 0.02375423369325616)"
str_m2_o1_o1_pcu_sym.13,"(9, 0.009490765780557603)"
str_m2_o1_o1_pcu_sym.13,"(10, -0.004902532744231386)"
str_m2_o1_o1_pcu_sym.13,"(11, -0.019370713302210574)"
str_m2_o1_o1_pcu_sym.13,"(12, -0.033857120138244906)"
str_m2_o1_o1_pcu_sym.13,"(13, -0.04830435748521225)"
str_m2_o1_o1_pcu_sym.13,"(14, -0.06265528523975476)"
str_m2_o1_o1_pcu_sym.13,"(15, -0.07685400632511057)"
str_m2_o1_o1_pcu_sym.13,"(16, -0.09084680959953262)"
str_m2_o1_o1_pcu_sym.13,"(17, -0.10458303507154901)"
str_m2_o1_o1_pcu_sym.13,"(18, -0.11801583301808308)"
str_m2_o1_o1_pcu_sym.13,"(19, -0.13110279491694105)"
str_m2_o1_o1_pcu_sym.13,"(20, -0.14380644134470646)"
str_m2_o1_o1_pcu_sym.13,"(21, -0.15609455955942697)"
str_m2_o1_o1_pcu_sym.13,"(22, -0.1679403908161493)"
str_m2_o1_o1_pcu_sym.13,"(23, -0.17932267406537003)"
str_m2_o1_o1_pcu_sym.13,"(24, -0.1902255581925052)"
str_m2_o1_o1_pcu_sym.13,"(25, -0.20063839914188714)"
str_m2_o1_o1_pcu_sym.13,"(26, -0.21055546104192327)"
str_m2_o1_o1_pcu_sym.13,"(27, -0.2199755418434945)"
str_m2_o1_o1_pcu_sym.13,"(28, -0.22890154413486238)"
str_m2_o1_o1_pcu_sym.13,"(29, -0.23734001090506007)"
str_m2_o1_o1_pcu_sym.13,"(30, -0.24530064433293064)"
str_m2_o1_o1_pcu_sym.13,"(31, -0.25279582342895063)"
str_m2_o1_o1_pcu_sym.13,"(32, -0.2598401337869317)"
str_m2_o1_o1_pcu_sym.13,"(33, -0.26644992001895307)"
str_m2_o1_o1_pcu_sym.13,"(34, -0.2726428688175752)"
str_m2_o1_o1_pcu_sym.13,"(35, -0.2784376281409612)"
str_m2_o1_o1_pcu_sym.13,"(36, -0.28385346583472154)"
str_m2_o1_o1_pcu_sym.13,"(37, -0.28890996913832867)"
str_m2_o1_o1_pcu_sym.13,"(38, -0.2936267849924906)"
str_m2_o1_o1_pcu_sym.13,"(39, -0.2980233998619004)"
str_m2_o1_o1_pcu_sym.13,"(40, -0.30211895689318696)"
str_m2_o1_o1_pcu_sym.13,"(41, -0.30593210760759615)"
str_m2_o1_o1_pcu_sym.13,"(42, -0.3094808949429867)"
str_m2_o1_o1_pcu_sym.13,"(43, -0.3127826642692513)"
str_m2_o1_o1_pcu_sym.13,"(44, -0.31585399896554345)"
str_m2_o1_o1_pcu_sym.13,"(45, -0.31871067722996715)"
str_m2_o1_o1_pcu_sym.13,"(46, -0.321367646960252)"
str_m2_o1_o1_pcu_sym.13,"(47, -0.32383901576969565)"
str_m2_o1_o1_pcu_sym.13,"(48, -0.3261380534635775)"
str_m2_o1_o1_pcu_sym.13,"(49, -0.32827720457917364)"
str_m2_o1_o1_pcu_sym.13,"(50, -0.33026810887351754)"
str_m2_o1_o1_pcu_sym.13,"(51, -0.33212162791689326)"
str_m2_o1_o1_pcu_sym.13,"(52, -0.33384787620951406)"
str_m2_o1_o1_pcu_sym.13,"(53, -0.335456255479275)"
str_m2_o1_o1_pcu_sym.13,"(54, -0.3369554910371653)"
str_m2_o1_o1_pcu_sym.13,"(55, -0.33835366926275096)"
str_m2_o1_o1_pcu_sym.13,"(56, -0.3396582754650319)"
str_m2_o1_o1_pcu_sym.13,"(57, -0.3408762315147539)"
str_m2_o1_o1_pcu_sym.13,"(58, -0.34201393277418235)"
str_m2_o1_o1_pcu_sym.13,"(59, -0.34307728396111714)"
str_m2_o1_o1_pcu_sym.13,"(60, -0.344071733677319)"
str_m2_o1_o1_pcu_sym.13,"(61, -0.3450023074094316)"
str_m2_o1_o1_pcu_sym.13,"(62, -0.34587363887476186)"
str_m2_o1_o1_pcu_sym.13,"(63, -0.3466899996366632)"
str_m2_o1_o1_pcu_sym.13,"(64, -0.34745532695643044)"
str_m2_o1_o1_pcu_sym.13,"(65, -0.3481732498820096)"
str_m2_o1_o1_pcu_sym.13,"(66, -0.348847113599852)"
str_m2_o1_o1_pcu_sym.13,"(67, -0.34948000209604413)"
str_m2_o1_o1_pcu_sym.13,"(68, -0.3500747591875006)"
str_m2_o1_o1_pcu_sym.13,"(69, -0.35063400799442934)"
str_m2_o1_o1_pcu_sym.13,"(70, -0.35116016893222357)"
str_m2_o1_o1_pcu_sym.13,"(71, -0.35165547630510496)"
str_m2_o1_o1_pcu_sym.13,"(72, -0.3521219935857862)"
str_m2_o1_o1_pcu_sym.13,"(73, -0.35256162746560893)"
str_m2_o1_o1_pcu_sym.13,"(74, -0.35297614075846906)"
str_m2_o1_o1_pcu_sym.13,"(75, -0.3533671642396593)"
str_m2_o1_o1_pcu_sym.13,"(76, -0.35373620749784274)"
str_m2_o1_o1_pcu_sym.13,"(77, -0.3540846688749134)"
str_m2_o1_o1_pcu_sym.13,"(78, -0.3544138445647064)"
str_m2_o1_o1_pcu_sym.13,"(79, -0.35472493693749946)"
str_m2_o1_o1_pcu_sym.13,"(80, -0.35501906215314966)"
str_m2_o1_o1_pcu_sym.13,"(81, -0.3552972571215952)"
str_m2_o1_o1_pcu_sym.13,"(82, -0.35556048586538835)"
str_m2_o1_o1_pcu_sym.13,"(83, -0.35580964533499726)"
str_m2_o1_o1_pcu_sym.13,"(84, -0.3560455707237964)"
str_m2_o1_o1_pcu_sym.13,"(85, -0.35626904032605944)"
str_m2_o1_o1_pcu_sym.13,"(86, -0.35648077997781347)"
str_m2_o1_o1_pcu_sym.13,"(87, -0.3566814671171874)"
str_m2_o1_o1_pcu_sym.13,"(88, -0.3568717344978466)"
str_m2_o1_o1_pcu_sym.13,"(89, -0.3570521735862725)"
str_m2_o1_o1_pcu_sym.13,"(90, -0.35722333767101466)"
str_m2_o1_o1_pcu_sym.13,"(91, -0.35738574470960055)"
str_m2_o1_o1_pcu_sym.13,"(92, -0.35753987993653735)"
str_m2_o1_o1_pcu_sym.13,"(93, -0.35768619825375747)"
str_m2_o1_o1_pcu_sym.13,"(94, -0.3578251264229593)"
str_m2_o1_o1_pcu_sym.13,"(95, -0.3579570650775353)"
str_m2_o1_o1_pcu_sym.13,"(96, -0.35808239057018015)"
str_m2_o1_o1_pcu_sym.13,"(97, -0.3582014566708064)"
str_m2_o1_o1_pcu_sym.13,"(98, -0.358314596128054)"
str_m2_o1_o1_pcu_sym.13,"(99, -0.3584221221064641)"`;

  // Parse CSV data
  const parseCSVData = (csvString) => {
    // Split the CSV string into lines
    const lines = csvString.trim().split('\n');
    
    // Skip the header row (first line)
    const dataLines = lines.slice(1);
    
    // Parse each line
    return dataLines.map((line) => {
      // Extract MOF name and coordinates
      const match = line.match(/(.*?),"\((.*?), (.*?)\)"/);
      
      if (match && match.length === 4) {
        const mofName = match[1].trim();
        const iteration = parseInt(match[2]);
        const energy = parseFloat(match[3]);
        
        return {
          mofName,
          iteration,
          energy
        };
      }
      return null;
    }).filter(item => item !== null);
  };

  // Prepare chart data
  const prepareChartData = (aiData, existingData) => {
    const chartData = [];
    
    // Use only the first 100 points
    const limit = 100;
    
    for (let i = 0; i < limit; i++) {
      if (i < aiData.length && i < existingData.length) {
        const improvementValue = existingData[i].energy - aiData[i].energy;
        
        chartData.push({
          config: `Iteration ${i}`,
          existing: existingData[i].energy,
          ai: aiData[i].energy,
          improvement: improvementValue
        });
      }
    }
    
    return chartData;
  };
  
  // Load and process data when component mounts
  useEffect(() => {
    // Parse the embedded datasets
    const aiData = parseCSVData(aiMOFData);
    const existingData = parseCSVData(existingMOFData);
    
    // Prepare data for the chart
    const chartData = prepareChartData(aiData, existingData);
    setData(chartData);
    
    // Start animation with a short delay
    setTimeout(() => setAnimated(true), 500);
  }, []);
  
  // Custom colors for the chart
  const chartColors = {
    existing: '#EF4444', // Red
    ai: '#10B981',      // Green
    comparison: '#F59E0B'  // Amber
  };

  // Play animation when button is clicked
  const playAnimation = () => {
    setAnimated(false);
    setIsPlayingAnimation(true);
    setTimeout(() => {
      setAnimated(true);
      setIsPlayingAnimation(false);
    }, 2500); // Animation duration + delay
  };
  
  // Filter data based on activeView
  const getChartData = () => {
    if (activeView === 'existing') {
      return data.map(item => ({ config: item.config, existing: item.existing }));
    } else if (activeView === 'ai') {
      return data.map(item => ({ config: item.config, ai: item.ai }));
    } else if (activeView === 'comparison') {
      return data;
    }
    return data;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = data.find(item => item.config === label);
      const improvement = item?.improvement;
      const improvementPercentage = item ? Math.round((improvement / Math.abs(item.existing)) * 100) : 0;
      
      return (
        <div className="bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border border-gray-700 shadow-xl">
          <p className="text-white font-bold mb-2">{label}</p>
          
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center my-1">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-gray-300">
                <span className="text-gray-400">{entry.name}: </span>
                <span className="font-medium">{entry.value.toFixed(4)}</span>
              </p>
            </div>
          ))}
          
          {payload.length > 1 && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-emerald-400 font-medium">
                Improvement: {improvement.toFixed(4)} ({improvementPercentage}%)
              </p>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  // Calculate average improvement percentage
  const getAverageImprovement = () => {
    if (!data.length) return 0;
    
    const avgImprovement = data.reduce((total, item) => {
      return total + (item.improvement / Math.abs(item.existing)) * 100;
    }, 0) / data.length;
    
    return avgImprovement.toFixed(1);
  };

  return (
    <div>
      <div className="flex justify-center mb-6 space-x-2 text-sm">
        <motion.button 
          onClick={() => setActiveView('existing')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'existing' 
            ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/50' 
            : 'bg-white/10 text-red-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Existing MOFs
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('ai')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'ai' 
            ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg shadow-green-500/50' 
            : 'bg-white/10 text-green-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI MOFs
        </motion.button>
        <motion.button 
          onClick={() => setActiveView('comparison')}
          className={`px-4 py-2 rounded-lg transition-all ${activeView === 'comparison' 
            ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/50' 
            : 'bg-white/10 text-amber-300 hover:bg-white/20'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Compare
        </motion.button>
        
        <motion.button
          onClick={playAnimation}
          disabled={isPlayingAnimation}
          className={`ml-2 px-2 py-2 rounded-lg transition-all bg-white/10 text-blue-300 hover:bg-white/20 ${isPlayingAnimation ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={!isPlayingAnimation ? { scale: 1.05 } : {}}
          whileTap={!isPlayingAnimation ? { scale: 0.95 } : {}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={getChartData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25,
          }}
          onMouseMove={(data) => {
            if (data && data.activeTooltipIndex !== undefined) {
              setHoveredPoint(data.activeTooltipIndex);
            } else {
              setHoveredPoint(null);
            }
          }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="existingLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#F87171" stopOpacity={0.8}/>
            </linearGradient>
            <linearGradient id="aiLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#34D399" stopOpacity={0.8}/>
            </linearGradient>
            
            {/* Glow filters */}
            <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="config" 
            stroke="rgba(255,255,255,0.7)"
            tick={false} // Remove tick values
            label={{
              value: 'Optimization Step',
              position: 'insideBottom',
              dy: 10,
              fill: 'rgba(255,255,255,0.7)'
            }}
            axisLine={{ strokeWidth: 1 }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)" 
            tick={false}
            label={{ 
              value: 'Energy Value (EV)', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 50,
              fill: 'rgba(255,255,255,0.7)' 
            }}
            domain={['dataMin', 'dataMax']}
            axisLine={{ strokeWidth: 1 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ color: "white" }}
          />
          
          {/* Reference line for zero energy level */}
          {activeView === 'comparison' && (
            <ReferenceLine 
              y={0} 
              stroke="rgba(255,255,255,0.5)" 
              strokeDasharray="3 3" 
              label={{ 
                value: 'Zero Energy Level', 
                position: 'insideBottomRight', 
                fill: 'rgba(255,255,255,0.7)',
                fontSize: 12
              }} 
            />
          )}
          
          {(activeView === 'existing' || activeView === 'comparison') && (
            <Line 
              type="monotone" 
              dataKey="existing" 
              name="Existing MOFs" 
              stroke="url(#existingLineGradient)" 
              strokeWidth={3}
              dot={{ 
                stroke: chartColors.existing, 
                strokeWidth: 2, 
                r: 6, 
                fill: '#1F2937',
                filter: hoveredPoint !== null ? "url(#glow-red)" : "none"
              }}
              activeDot={{ 
                r: 8, 
                stroke: 'white', 
                strokeWidth: 2,
                filter: "url(#glow-red)"
              }}
              isAnimationActive={!animated}
              animationDuration={2000}
              animationBegin={0}
            />
          )}
          
          {(activeView === 'ai' || activeView === 'comparison') && (
            <Line 
              type="monotone" 
              dataKey="ai" 
              name="AI-Designed MOFs" 
              stroke="url(#aiLineGradient)" 
              strokeWidth={3}
              dot={{ 
                stroke: chartColors.ai, 
                strokeWidth: 2, 
                r: 6, 
                fill: '#1F2937',
                filter: hoveredPoint !== null ? "url(#glow-green)" : "none"
              }}
              activeDot={{ 
                r: 8, 
                stroke: 'white', 
                strokeWidth: 2,
                filter: "url(#glow-green)"
              }}
              isAnimationActive={!animated}
              animationDuration={2000}
              animationBegin={500}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <AnimatePresence>
        {activeView === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-center"
          >
            <p className="text-emerald-300 text-sm font-medium">
              AI-designed MOFs achieve {getAverageImprovement()}% lower energy levels after multiple iterations
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuantumEnergyChart;