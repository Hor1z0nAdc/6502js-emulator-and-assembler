const options = ['Címzés 1', 'Címzés 2', 'Címzés 3', 'Címzés 4', 'Aritmetika',"Decimális mód", "Elágazás", "Ugrás", "Stack", "Logikai műveletek", "Eltolás, rotáció", "Szubrutin", "Végtelen ciklus","16 bites összeadás" ,"Kiírás", "Bekérés", "Véletlenszám", "Összeadás bekéréssel"];
  const preCodes = [[";Bennefoglalt",
                     "LDA #15 ;betölti az A reg-be a decimális értéket", 
                     "LDX #$15 ;betölti az X reg-be hexadecimális értéket",
                     "",
                     ";Zero-page",
                     "STA $ff  ;tárolja az A reg értékét a memóriába",
                     "LDY $ff  ;betölti az Y reg-be a memóriában lévő értéket"
                    ], 
                    [";Abszolút",
                     ";Betölti az y reg-be az előzőleg megadott A reg",
                     ";értékét a memóriából",
                     "",
                     "LDA #3",
                     "STA $f103",
                     "LDY $f103",
                     "",
                     ";Abszolút indexelt",
                     ";Eltolja a felkeresendő memóriacellát a korábban",
                     ";Y reg-be betöltött értékkel",
                     "",
                     "LDX $f100,Y",
                     "",
                     ";Zero-page indexelt",
                     ";Új értéket ad az A reg-nek és a korábban",
                     ";X reg-be betöltött értékkel eltolja a felkeresendő",
                     ";zero-pag tartományán belüli memóriacellát",
                     "",
                     "LDA #6",
                     "STA $ff",
                     "LDY $fc,X"
                    ],
                    [";Indexelt indirekt",
                     "",
                     ";Ez lesz az offset",
                     "LDX #3",
                     "",
                     ";High bitek mentése a memóriacímhez",
                     "LDA #$20",
                     "STA $f3",
                     "",
                     ";Low bitek mentése a memóriacímhez",
                     "LDA #$10",
                     "STA $f4",
                     "",
                     ";Érték beírása a memóriába",
                     "LDA #1",
                     "STA $1020",
                     "",
                     "LDA ($f0,X)",
                    ],
                    [";Indirekt indexelt",
                     "",
                     ";Ez lesz az offset",
                     "LDY #7",
                     "",
                     ";High bitek mentése a memóriacímhez",
                     "LDA #$20",
                     "STA $80",
                     "",
                     ";Low bitek mentése a memóriacímhez",
                     "LDA #$40",
                     "STA $81",
                     "",
                     ";Érték beírása a memóriába",
                     "LDA #9",
                     "STA $4027",
                     "",
                     "LDA ($80),Y"
                    ],
                    [";Összeadás",
                     "CLC",
                     "LDA #1",
                     "ADC #4",
                     "",
                     ";Kivonás",
                     "TAX ;Az összeadás eredménye az X reg-be kerül",
                     "SEC",
                     "SBC #2",
                     "",
                     ";Inkrementálás",
                     "TAY ;inc és dec-hez Y reg-be menti a kivonás eredményét",
                     "INY",
                     "INY",
                     "",
                     ";Dekrementálás",
                     "DEY"
                    ],
                    [
                      ";Összeadás egyező eredménnyel",
                      "SED",
                      "CLC",
                      "LDA #$50",
                      "ADC #$40",
                      "",
                      ";Összeadás decimálisban mást hozó eredménnyel",
                      "CLC",
                      "TAX ;Összeadás eredménye X regiszterbe kerül",
                      "ADC #$11",
                      "",
                      ";Kivonás decimálisban mást hozó eredménnyel",
                      "TAY ;Második összeadás eredménye Y regiszterbe kerül",
                      "SED",
                      "SEC",
                      "LDA #$20",
                      "SBC #$35"
                    ],
                    ["LDA #9 ;számon tartja az eredeti értéket",
                     "TAX",
                     "",
                     ";Addig ismétli a programrész, amíg az X reg értéke",
                     ";egyenlő nem lesz öttel",
                     "csokkent:",
                     "DEX",
                     "CPX #5",
                     "BNE csokkent"
                    ],
                    ["define harom 3 ;a konstansból tölti be az értéket a reg-be",
                     "",
                     "LDA #harom",
                     "JMP ugras",
                     "",
                     ";ez a rész kimarad",
                     "LDA #10",
                     "",
                     "ugras:",
                     "TAX"
                    ],
                    [";Kiszínezi a monítor első sorát",
                     "",
                     "elso_fel:",
                     "TXA",
                     "STA $0200,Y",
                     "PHA ;A reg tartalmának mentése stack-re",
                     "INX ;Stackre mentés után növeli a köv. mentendő értéket",
                     "INY ;Hogy a sorban következő pixelt írja felül",
                     "CPY #$10",
                     "BNE elso_fel ;Addig fut, amíg 16 nem lesz az Y értéke",
                     "",
                     "masodik_fel:",
                     "PLA ;Fordított sorrendben A reg-be teszi a stackről az értéket",
                     "STA $0200,Y",
                     "INY ;Hogy a sorban következő pixelt írja felül",
                     "CPY #$20",
                     "BNE masodik_fel ;Y=16-től fut addig, amíg Y!=32"
                    ],
                    [
                     ";És",
                     "LDA #5",
                     "AND #1",
                     "TAX ;És eredményének mentése X reg-be",
                     "",
                     ";Vagy",
                     "LDA #5",
                     "ORA #1",
                     "TAY ;Vagy eredményének mentése Y reg-be",
                     "",
                     ";Kizáró vagy",
                     "LDA #5",
                     "EOR #1 ;Kizáró vagy eredménye A reg-ben látható"
                    ],
                    [
                      ";Eltolás balra",
                      "LDA #$ff",
                      "ASL",
                      "TAX ;eredmény mentése X reg-be",
                      "",
                      ";Eltolás jobbra",
                      "LDA #$ff",
                      "LSR",
                      "TAY ;eredmény mentése Y reg-be",
                      "",
                      ";Rotáció balra",
                      ";A carry bitet bebillentjük, ezáltal nem csak eltolja",
                      ";a byte bitjeit eggyel balra, hanem a carryt is",
                      ";hozzáadja a byte végéhe",
                      "SEC",
                      "LDA #2",
                      "ROL ;az eredmény az A reg-ben marad"
                    ],
                    [
                     "JSR betolt",
                     "JSR ciklus",
                     "JSR befejez",
                     "",
                     "betolt:",
                     "LDX #3",
                     "RTS ;vissza, jön a ciklus rutin",
                     "",
                     "ciklus:",
                     "INX",
                     "INY ;Y reg fogja jelezni, hogy mennyivel növekedett az X reg",
                     "CPX #8",
                     "BNE ciklus ;addig fut, amíg x=3-ból x=8 nem lesz",
                     "RTS ;vissza, jön a befejez rutin",
                     "",
                     "befejez:",
                     "TXA "
                    ],
                    ["ciklus:",
                     "LDA #1",
                     "LDX #2",
                     "LDY #3",
                     "STA $fd",
                     "STA $fe",
                     "STA $ff",
                     "JMP ciklus"
                    ],
                    [
                     ";Felhasznált képletek:",
                     ";szam1_high = INT (800/256) = 3",
                     ";szam1_low = 800 - szam1_high * 256 = 800- 768 = 32",
                     ";szam2_high = INT (200/256) = 0",
                     ";szam2_low = 200 - szam1_high * 256 = 200 - 0 = 200",
                     "",
                     "define eredmeny_low $100",
                     "define eredmeny_high $101",
                     ";800",
                     "define szam1_low 32",
                     "define szam1_high 3",
                     ";200",
                     "define szam2_low 200",
                     "define szam2_high 0 ;200",
                     "",
                     "CLC",
                     "LDA #szam1_low",
                     "ADC #szam2_low",
                     "STA eredmeny_low ;elmenti a 32 + 200 eredményét",
                     "",
                     "LDA #szam1_high",
                     "ADC #szam2_high",
                     "",
                     ";3 * 256 + 232 = 768 + 232 = 1000",
                     "LDX eredmeny_low  ;betölti X reg-be a 232-őt"
                    ],
                    [
                     "string hello \"Hello world\"",
                     "",
                     "kiir:",
                     "lda hello,x",
                     "jsr $ffd2",
                     "inx",
                     "cpx #11",
                     "bne kiir"
                    ],
                    [
                      "string utasitas \"(nyomjon entert, ha befejezte a gépelést)\"",
                      "string nev \"\\na nevem: \"",
                      "string hello \"\\nÜdvözlöm \"",
                      "",
                      "define ki_rutin $ffd2",
                      "define szkan $ff9f",
                      "",
                      ";Kiíró rutinok előtt 0-ra kell állítani az x reg-et",
                      ";mivel ezt használjuk ahhoz, hogy tudjuk a kiírandó",
                      ";szöveg hányadik karakterénél tart a kiírás",
                      "LDX #0",
                      "JSR kiir_utasitas",
                      "",
                      "LDX #0",
                      "JSR kiir_kerelem",
                      "",
                      "LDX #0",
                      "JSR beker",
                      "",
                      "DEY ;csökkenteni kell, hogy az entert ne számolja bele",
                      "LDX #0",
                      "JSR kiir_hello",
                      "",
                      "LDX #0",
                      "STY $10 ;mentjük, hogy a beírt név hány karakterből áll",
                      "JSR kiir_nev",
                      "JSR vege",
                      "",
                      "kiir_utasitas:",
                      "LDA utasitas,x",
                      "JSR ki_rutin",
                      "INX",
                      "CPX #41",
                      "BNE kiir_utasitas",
                      "RTS",
                      "",
                      "kiir_kerelem:",
                      "LDA nev,x",
                      "JSR ki_rutin",
                      "INX",
                      "CPX #10",
                      "BNE kiir_kerelem",
                      "RTS",
                      "",
                      "kiir_hello:",
                      "LDA hello,x",
                      "JSR ki_rutin",
                      "INX",
                      "CPX #10",
                      "BNE kiir_hello",
                      "RTS",
                      "",
                      "beker:",
                      "JSR szkan",
                      "LDA $ff",
                      "CMP #$42 ;backspace kódja",
                      "BEQ csokkent ;ha törölt karaktert, csökkentjük y reget",
                      "STA $1000,Y",
                      "INY ;növeljük, hogy tudjuk mennyi karaktert ütött be",
                      "CMP #$45 ;enter kódja",
                      "BNE beker ;amíg nem enter, újra bekér karaktert",
                      "RTS",
                      "",
                      "kiir_nev:",
                      "LDA $1000,x",
                      "INX",
                      "JSR ki_rutin",
                      "CPX $10",
                      "BNE kiir_nev",
                      "RTS",
                      "",
                      "csokkent:",
                      "DEY",
                      "JMP beker",
                      "",
                      "vege:",
                      "NOP"
                    ],
                    [
                      ";A program végtelen ciklusban véletlen színnel",
                      ";kiszínezi a monitor egy-egy véletlen pixelét",
                      "ciklus:",
                      "LDA $fe  ;véletlen low byte",
                      "STA $00  ;menti a monitor pixel címének low bitjeit",
                      "",
                      "LDA $fe  ;véletlen high byte",
                      "AND #$3",
                      "CLC",
                      "ADC #$2",
                      "STA $01  ;menti a monitor pixel címének high bitjeit",
                      "",
                      "LDA $fe  ;véletlen szín",
                      ";Az STA-hoz nem tartozik idirekt verzió, viszont nekünk",
                      ";az kell. Ezért y reg 0 lesz, így semmivel sem tolja el",
                      "LDY #$0",
                      "STA ($00),y ;$00 és $01 kombinációja monitor pixelét címzi",
                      "JMP ciklus"
                    ],
                    [";A program összead két begépetl decimális számot",
                     ";Az eredménynek bele kell férnie 8 bitbe",
                     "",
                     "string elso \"1. szám (pl. 015, 006): \"",
                     "string masodik \"\\n2. szám: \"",
                     "string ujsor \"\\n\"",
                     "string egyenlo \" = \"",
                     "string plusz \" + \"",
                     "",
                     ";Első bekérendő szám",
                     "JSR kiir_elso",
                     "LDX #0 ;x reg jelzi, hány számjegyet írt be",
                     "JSR beker ;bekér 3 jegyű számot",
                     "",
                     ";Második bekérendő szám",
                     "LDX #0 ;itt x reg jelzi, hanyadik karaktert irja ki",
                     "JSR kiir_masodik",
                     "LDX #0",
                     "JSR beker",
                     "",
                     ";Új sort kezd",
                     "LDX #0",
                     "LDA ujsor,x",
                     "JSR $ffd2",
                     "",
                     ";Kiírja: a + b =",
                     "LDY #0 ;y reg jelzi, hogy a 6 szamjegyből mennyit írt ki",
                     "JSR kiir_bekert_elso",
                     "LDX #0 ;x reget használ plusz és az egyenlő kiírásához",
                     "JSR kiir_plusz",
                     "JSR kiir_bekert_masodik",
                     "LDX #0",
                     "JSR kiir_egyenlo",
                     "",
                     ";Összeadja a két bekért számot",
                     "LDY #0",
                     "JSR szamol",
                     "JSR kiir_eredmeny",
                     "JMP vege",
                     "",
                     "kiir_eredmeny_szaz:",
                     "STA $30",
                     "INY",
                     "SEC",
                     "SBC #100",
                     "BPL kiir_eredmeny_szaz",
                     "",
                     "DEY",
                     "TYA",
                     "CLC",
                     "ADC #48",
                     "JSR $ffd2",
                     "RTS",
                     "",
                     "kiir_eredmeny_tiz:",
                     "STA $30",
                     "INY",
                     "SEC",
                     "SBC #10",
                     "BPL kiir_eredmeny_tiz",
                     "",
                     "DEY",
                     "TYA",
                     "CLC",
                     "ADC #48",
                     "JSR $ffd2",
                     "RTS",
                     "",
                     "kiir_eredmeny:",
                     "JSR kiir_eredmeny_szaz",
                     "LDY #0",
                     "LDA $30",
                     "JSR kiir_eredmeny_tiz",
                     "",
                     "LDA $30",
                     "CLC",
                     "ADC #48",
                     "JSR $ffd2",
                     "RTS",
                     "",
                     "szoroz_tiz:",
                     "ASL         ;A = x*2",
                     "STA $100    ;x*2 mentése",
                     "ASL         ;A = x*4",
                     "ASL         ;A = x*8",
                     "CLC",
                     "ADC $100    ;A = x*8 + x*2",
                     "RTS",
                     "",
                     "szoroz_szaz:",
                     "ASL      ;A = x*2",
                     "ASL      ;A = x*4",
                     "STA $101 ;x*4 mentése",
                     "ASL      ;A = x*8",
                     "ASL      ;A = x*16",
                     "ASL      ;A = x*32",
                     "STA $102 ;x*32 mentése",
                     "ASL      ; A = x*64",
                     "CLC",
                     "ADC $101 ;A = x*64 + x*4",
                     "CLC",
                     "ADC $102 ;A = x*68 + x*32",
                     "RTS",
                     "",
                     "kiir_elso:",
                     "LDA elso,x",
                     "JSR $ffd2",
                     "INX",
                     "CPX #24",
                     "BNE kiir_elso",
                     "RTS",
                     "",
                     "kiir_masodik:",
                     "LDA masodik,x",
                     "JSR $ffd2",
                     "INX",
                     "CPX #10",
                     "BNE kiir_masodik",
                     "RTS",
                     "",
                     "beker:",
                     "JSR $ff9f",
                     "LDA $ff",
                     "STA $1000,Y",
                     "INY ;növeljük, hogy 6 ból mennyi számjegyet ütött be",
                     "INX ;növeljük, hogy tudjuk a 3 számjegyből mennyinél tart",
                     "CPX #3",
                     "BNE beker ;amíg x!=3 bekér számjegyet",
                     "RTS",
                     "",
                     "kiir_bekert_elso:",
                     "LDA $1000,y",
                     "JSR $ffd2",
                     "INY",
                     "CPY #3",
                     "BNE kiir_bekert_elso",
                     "RTS",
                     "",
                     "kiir_plusz:",
                     "LDA plusz,x",
                     "JSR $ffd2",
                     "INX",
                     "CPX #3",
                     "BNE kiir_plusz",
                     "RTS",
                     "",
                     "kiir_bekert_masodik:",
                     "LDA $1000,y",
                     "JSR $ffd2",
                     "INY",
                     "CPY #6",
                     "BNE kiir_bekert_masodik",
                     "RTS",
                     "",
                     "kiir_egyenlo:",
                     "LDA egyenlo,x",
                     "JSR $ffd2",
                     "INX",
                     "CPX #3",
                     "BNE kiir_egyenlo",
                     "RTS",
                     "",
                     "szamol_szaz:",
                     "SEC",
                     "SBC #48 ;Ki kell vonni, hogy ascii-ból a szám értékét kapjuk",
                     "JSR szoroz_szaz ;Eredmény: A = A * 100",
                     "STA $10 ;Mentjük a szám százas értékét",
                     "RTS",
                     "",
                     "szamol_tiz:",
                     "SEC",
                     "SBC #48",
                     "JSR szoroz_tiz ; A = A * 10",
                     "STA $11 ;Mentjük az első szám tizes értékét",
                     "RTS",
                     "",
                     "szamol_befejez:",
                     "SEC",
                     "SBC #48",
                     "CLC",
                     "ADC $10 ;Hozzáadja a százas helyiértéket",
                     "CLC",
                     "ADC $11 ;Hozzáadja a tízes helyiértéket",
                     "RTS",
                     "",
                     "szamol:",
                     "LDA $1000 ;Betölti az első szám százas helyiértékét",
                     "JSR szamol_szaz",
                     "",
                     "LDA $1001 ;Betölti az első szám tízes helyiértékét",
                     "JSR szamol_tiz",
                     "",
                     "LDA $1002 ;Betölti az második szám egyes helyiértékét",
                     "JSR szamol_befejez",
                     "STA $20 ;Menti a teljes bekért első számot",
                     "",
                     "LDA $1003 ;Betölti a második szám százas helyiértékét",
                     "JSR szamol_szaz",
                     "",
                     "LDA $1004 ;Betölti a második szám tízes helyiértékét",
                     "JSR szamol_tiz",
                     "",
                     "LDA $1005 ;Betölti a második szám egyes helyiértékét",
                     "JSR szamol_befejez",
                     "STA $21 ;Mentis a teljes bekért második számot",
                     "",
                     "CLC",
                     "ADC $20 ;Hozzáadja a második bekért számot az elsőhöz",
                     "STA $22",
                     "RTS",
                     "",
                     "vege:",
                     "NOP"
                    ]
                    ];

export { options, preCodes }