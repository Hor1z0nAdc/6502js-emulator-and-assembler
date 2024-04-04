import React from 'react'

const Guide = () => {
  return (
    <div>
      <div className='guide-section'>
        <a className='guide-title' href="#regiszterek">Regiszterek</a>
        <a className='guide-title' href="#flagek">Flagek</a>
        <a className='guide-title' href="#címzés">Címzési módok</a>
        <a className='guide-title' href="#memória">Memória</a>
        <a className='guide-title' href="#assembler">Assembler</a>
        <a className='guide-title' href="#monitor">Monitor</a>
        <a className='guide-title' href="#konzol">Konzol</a>
        <a className='guide-title' href="#decimális">Decimális mód</a>
        <a className='guide-title' href="#egyéb">Egyéb tudnivalók</a>
      </div>
      
       <div id="regiszterek" className='center-format'>
          <div className='inst-div'>
              <h2>Regiszterek</h2>
              <div className='sub-div'>
                <h3>Akkumulátor (A)</h3>
                <p>Ebbe a 8 bites regiszterbe íródnak a legtöbb logikai és aritmetikai műveletek eredményei.
                   A konzolon az a karakter fog megjelenni a kiírás szubrutin hívásnál, amelyik karakter ascii kódja
                   az akkumulátorban található.
                </p>
              </div>
              
              <div className='sub-div'>
                <h3>Index regiszter X</h3>
                <p>
                  Ezt a 8 bites index regisztert leggyakrabban számlálók vagy a memóriához való hozzáférést kiegészítő
                  offsetek tárolására használják. Speciális címzési móddal rendelkezik, ez az indexelt indirekt.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Index regiszter Y</h3>
                <p>Az Y regiszter hasonló az X regiszterhez, viszont ez a regiszter rendelkezik indirekt indexelt
                   címzési móddal.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Program számláló (PC)</h3>
                <p>Ez a regiszter arra a címre mutat, ahonnan a következő utasításbájt (opkód vagy paraméter)
                   lekérésre kerül. A többi regiszterrel ellentétben ez a regiszter 16 bites.
                   A programszámláló értéke az utasítások végrehajtása során automatikusan növekszik.
                   A programszámláló értéke módosítható egy ugrás, egy relatív elágazás vagy egy szubrutinhívás 
                   végrehajtásával (hogy egy másik utasítás első bájtjára mutasson), illetve egy szubrutinból vagy megszakításból való 
                   visszatéréssel.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Veremmutató (SP)</h3>
                <p>A processzor rendelkezik 256 bájtos veremmel, melyet a memória $0100 és $01FF közötti szegmense alkot. A veremmutató egy 8 bites 
                   regiszter, és a verem következő szabad helyének alsó 8 bitjét tartalmazza. A veremre történő
                   rárakás a veremmutató dekrementálódását okozza. Ezzel szemben a bájtok levétele a veremről a 
                   veremmutató inkrementálódását eredményezi. A CPU nem érzékeli, ha a verem túlcsordul a 
                   túlzott rárakás vagy levétel műveletek miatt, ami akár a futó program hibás működéséhez vezethet.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Processzor státusz (SR)</h3>
                <p>Ez a 8 bites regiszter a program futása közben a processzor állapotáról tárol információkat. 
                   Az utasítások végrehajtása során a processzor egy sor flaget billent be, vagy állít 0-ra, hogy 
                   rögzítse az utasítás eredményével kapcsolatos bizonyos információkat. Az állapot flagek és néhány 
                   további kontroll flag a processzor státusz regiszterben tárolódnak. A regiszterben minden 
                   egyes flagnek egy bitet jelent.
                </p>
              </div>
          </div>
      </div>

      <div id="flagek" className='center-format'>
          <div className='inst-div'>
              <h2>Flagek</h2>
              <div className='sub-div'>
                <h3>Negatív flag (N)</h3>
                <p>Erre a flagre minden aritmetikai művelet hatással van (bár ezen kívül más művelet is hatással
                   van rá, pl. BIT). Arra szolgál, hogy jelezze: a művelet eredménye negatív, vagy sem.
                   Az eredmény akkor számít negatívnak a flag szerint, ha az eredmény hetedik bitje 1-es.
                   Ez a flag decimális műveletek esetén másként működik.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Túlcsordulás flag (Overflow - V)</h3>
                <p>A Negatív flaghez hasonlóan ez a flag is 8 bites előjeles egész számok esetén használható.
                   A flagre hatással vannak az aritmetikai műveletek és többek között a BIT. Bináris összeadás
                   vagy kivonás után a V flag előjeles túlcsordulás esetén be lesz állítva, egyébként nullázódik.
                   Mi az előjel-túlcsordulás?  Ha például 123 és 45 összeadásával próbálkozunk, az eredmény 
                   (168) nem fér bele egy 8 bites előjeles egész számba (felső határ 127 és alsó határ -128).
                   Hasonlóképpen a -123-hoz  -45  hozzáadása túlcsordulást okoz. Csakúgy, mint a -45 kivonása 
                   123-ból vagy 123 kivonása -45-ből.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Nem használt flag (-)</h3>
                <p>Ez a flag nem szolgál célt. Értéke mindig 1.</p>
              </div>

              <div className='sub-div'>
                <h3>Break flag (B)</h3>
                <p>Ez a flag a szoftveres (BRK) megszakítások és a hardveres megszakítások megkülönböztetésére szolgál.
                   A break bit akkor lesz bebillentve, ha egy BRK utasítás végrehajtásra került, és a 
                   feldolgozásához megszakítás generálódott.</p> 
              </div>

              <div className='sub-div'>
                <h3>Decimális mód flag (Decimal mode - D)</h3>
                <p>Ha ennek a flagnek az értéke 1 a processzor bináris kódolású decimális mód szabályai
                   szerint hajtja végre az összeadást és kivonást.</p>
              </div>

              <div className='sub-div'>
                <h3>Megszakítás kikapcsolása flag (Interrupt disable - I)</h3>
                <p>Amíg ez a flag be van billentve a processzor nem reagál az eszközök megszakításaira.</p>
              </div>

              <div className='sub-div'>
                <h3>Zéró flag (Z)</h3>
                <p>A bebillentett zéró flag azt jelzi, hogy az utolsó művelet eredménye 0 volt. Ez a flag
                  decimális módban másként működik.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Carry flag (C)</h3>
                <p>A carry flag akkor van bebillentve, ha az utolsó művelet túlcsordulást okozott az eredmény 
                   7-es bitjéből vagy alulcsordulást a 0-s bitjéből. Ez a feltétel aritmetikai műveletek, 
                   összehasonlítások és logikai eltolások során teljesülhet. Összeadásnál és kivonásnál 
                   9. bitként működik, és lehetővé teszi a műveletek láncolását a 8 bitesnél nagyobb számokkal 
                   való számoláshoz. Kivonáskor a Carry flag a negatívja a kölcsönzésnek: ha túlcsordulás 
                   történik, akkor a jelző 0-ra lesz állítva, ellenkező esetben be lesz billentve.
                   A bit rotációs műveletek a 8 bitből kiforgatott bitet a carry flagben tárolják.</p>
              </div>
          </div>
      </div>

      <div id="címzés" className='center-format'>
          <div className='inst-div'>
              <h2>Címzési módok</h2>

              <div className='sub-div'>
                <h3>Akkumulátor</h3>
                <p>Egyes utasításoknál lehetőség van arra, hogy közvetlenül az akkumulátort vegyék operandusnak.
                   Ilyen például az LSR és a ROL utasítás. Ennél a címzési módnál megadhatjuk a szintaxisban
                   operandusnak az akkumulátort. Viszont erre nem feltétlenül van szükség. Elegendő, ha 
                   egyedül az utasítást írjuk le az akkumulátor címzéshez.
                   <br></br><br></br>
                   Példa operandus megadással együtt: LSR A<br></br>
                   Példa operandus megadása nélkül: LSR
                </p>
              </div>

              <div className='sub-div'>
                <h3>Implikált</h3>
                <p>Egy implikált utasításban az adatot és/vagy a célállomást az utasítás előre meghatározza 
                  (mivel csak ez az egyfajta címzés létezik az adott utasítás).
                   Ilyen például a CLC utasítás, ami 0-ra állítja a carry flaget.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Azonnali</h3>
                <p>Ezeknek az utasításoknak az adatát az opkód utáni következő bájt határozza meg. A '#' szimbólum
                   jelzi, hogy az utána következő szám egy azonnali érték. Ha ezen szimbólum nélkül írnánk
                   az utasítás utána a számot, akkor egy memóriacímet címeznénk meg. Az operandust megadhatjuk
                   tízes, vagy hexadecimális számrendszerben. A hexadecimális számot '$' szimbólum előzi meg.
                   <br></br><br></br>
                   Példa tízes számrendszerben: LDA #48 <br></br>
                   Példa hexadecimális számrendszerben: LDA #$ff
                </p>
              </div>

              <div className='sub-div'>
                <h3>Abszolút</h3>
                <p>Az abszolút címzés egy memóriahelyet címez, melyet az opkódot követő két báj határoz meg. A memóriacímet
                   alkotó két bájt közül a legkisebb helyi értékű tárolódik először. Abszolút címzésnél a memóriacímet
                   kizárólag hexadecimális számrendszerben adhatjuk meg.<br></br><br></br>
                   Például: STA $20fa
                </p>
              </div>

              <div className='sub-div'>
                <h3>Relatív</h3>
                <p>Relatív címzést az elágazás utasítások használnak. Az opkód utáni bájt az elágazás offsetje.
                   Ha az elágazás megtörténik, az új cím az aktuális program számláló plusz az eltolás lesz. 
                   Az eltolás egy előjeles bájt, így maximum 127 bájtot ugorhat előre, vagy 128 bájtot hátra a 
                   programszámlálóhoz képest. A gyakorlati alkalmazás során a célcímet relatív címzésnél ugyanúgy adjuk meg,
                   mint abszolút címzésnél. Ugyanis nekünk nem az offsetet kell megadnunk operandusként, hanem azt a címet, 
                   ahová feltételesen el akarunk ágazni. A megadott címből az assembler fogja kiszámolni 
                   az offsetet. Relatív címzésnél a memóriacímet kizárólag hexadecimális számrendszerben 
                   adhatjuk meg.<br></br><br></br>
                   Például: BNE $0680
                </p>
              </div>

              <div className='sub-div'>
                <h3>Zéró lap</h3>
                <p>A zéró lap egy olyan címzési mód, amely csak a CPU memóriatérképének első 256 bájtját 
                  képes címezni. A zéról lap címzésnek két előnye van: az utasítás megadásához egy bájttal 
                  kevesebb bájtra van szükség, és kevesebb CPU-ciklus alatt hajtódik végre. Zéró lap címzésnél a
                  memóriacímet kizárólag hexadecimális számrendszerben adhatjuk meg.
                  <br></br><br></br>
                  Például: LDA $28
                </p>
              </div>

              <div className='sub-div'>
                <h3>Abszolút indexelt</h3>
                <p>Az abszolút indexelt címzés két operandust igényel: egy abszolút címet és az X vagy Y regisztert.
                  Ez a címzési mód a célcímet az X vagy Y regiszter tartalmának az abszolút címhez való hozzáadásával állítja elő.
                  Az X vagy Y regiszter az abszolút indexelt címzési módnál offsetként használható.
                  <br></br><br></br>
                  Példa X indexeltre: STA $1000,X<br></br>
                  Példa Y indexeltre: STA $1000,Y<br></br>
                  Tegyük fel, hogy az Y regiszter értéke kettő. Ez esetben az utóbbi példánál a célcím $1002 lesz. 
                </p>
              </div>

              <div className='sub-div'>
                <h3>Zéró lap indexelt</h3>
                <p>Ugyanúgy működik, mint az abszolút indexelés, de a célcím az első 256 bájtokra korlátozódik.
                   A célcím akkor is a zéró lapon lesz (első 256 bájt), ha kicímzünk a tartományból.
                   <br></br><br></br>
                   Példa X indexeltre: STA $2a,X<br></br>
                   Példa Y indexeltre: STA $C0,Y<br></br>
                   Amennyiben az utóbbi példánál az Y regiszter értéke $60, a zéró lap és az Y regiszter összege
                   $C0 + $60 = $120 lesz, ami túlcímez a zéró lapon. Ez esetben a célcím $20 lesz.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Indexelt indirekt</h3>
                <p>Ez a címzési mód csak az X regiszterrel használható. Az utasítást követő bájt a zéró lapot
                   címezi. Egyedül hexadecimális számrendszerben adható meg a memóriacím. Ennél a címzésnél 
                   a célcím a következő módon számítandó ki: tegyük fel, hogy az operandusunk $20, az X 
                   regiszter értéke pedig 2. Először az operandust összeadjuk az X regiszter értékével, így
                   kapjuk a $22 összeget. Ezután a processzor felkeresi a zéró lapon a $22 memóriacímet, kiolvassa
                   a címzett memóriarekeszből az adatot, majd a rá következő memóriarekeszből is. Az elsőnek kiolvasott
                   érték lesz a legkisebb helyi értékű bájt, ekképpen egy számot képezünk belőlük és ez lesz
                   a célcím. Például, ha a $22 címen az érték $07, a $23 címen pedig $11, akkor a kapott célcím
                   $1107 lesz. A $1107 memóriarekeszből kinyerjük a végső értéket és például egy LDA utasítás során
                   ezt eltároljuk az akkumulátorban (A). Persze annak a memóriacímnek, melyet az operandus és az X regiszter
                   összeadásával kapunk a zéró lapon kell lennie.<br></br><br></br>
                   Például: LDA ($20,X)
                </p>
              </div>

              <div className='sub-div'>
                <h3>Indirekt indexelt</h3>
                <p>Ez a címzési mód csak az Y regiszterrel használható. Abban különbözik az indexelt indirekt
                   címzéstől, hogy a zéró lapból kinyert címhez adja hozzá az Y regiszter értékét, és nem az operandushoz,
                   ami a zéró lapot címezi. Tegyük fel, hogy az operandus értéke $80, ekkor kinyerjük a $80 memóriacímű
                   és a rá következő rekesz értékét (sorrendben $20, $10). Ezeket összerakva kapjuk a $1020 memóriacímet,
                   amihez még hozzáadjuk az Y regiszter értékét és így megkapjuk a célregisztert. Az Y regiszter
                   értéke legye 3, így a célregiszter $1023. A $1023 memóriarekeszből kinyerjük a végső értéket és például egy LDA utasítás során
                   ezt eltároljuk az A regiszterben.<br></br><br></br>
                   Például: LDA ($86),Y 

                </p>
              </div>
          </div>
      </div>

      <div id="címzés" className='center-format'>
          <div id="memória" className='inst-div'>
              <h2>Memória</h2>
              <div className='sub-div'>
                <h3>Bevezetés</h3>
                <p>A memória 8 bites rekeszekből áll. A processzor címbusza 16 bites, ami meghatározza, hogy mi a 
                  memória legnagyobb memóriacíme. Ebből eredendően a memória 64 kilobájtnyi adatot tud
                  eltárolni. A memória 256, egyenként 256 bájtos lapnak tekinthető.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Címzési tartomány</h3>
                <p>
                  A memóriarekeszeket $0000 - $ffff intervallumon tudjuk megcímezni. Érdekesség gyanánt a tízes
                  számrendszerben ez a 0 - 65535 tartományt jelenti.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Zéró lap</h3>
                <p>
                  A nulladik lap címzési tartománya: $0000 - $00ff. Ezen a területen gyorsabban elérhetőek az adatok.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Verem</h3>
                <p>
                  A verem az első lapot öleli fel. Tartománya: $0100 - $01ff. Az értékek a FILO 
                  (First-in last-out) sorrendben kerülnek ebbe a régióba, és onnan vevődnek ki. A veremmutató értéke a 
                  használat során csökken, ezért a nemrég betöltött értékek alacsonyabb címeken tárolódnak, mint a 
                  régebbi értékek. A verem körbetekeredik, így ha 256 bájtnál több értéket pakolunk bele, akkor a 
                  legrégebbi értékek felülíródnak.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Egyéb</h3>
                <p>
                  A $fe memóriahely minden utasításnál egy új véletlenszerű bájtot tartalmaz.<br></br>
                  A $ff memóriahely az utoljára lenyomott billentyű ascii kódját tartalmazza.
                </p>
              </div>
          </div>
      </div>

      <div id="címzés" className='center-format'>
          <div id="assembler" className='inst-div'>
              <h2>Assembler</h2>
              <div className='sub-div'>
                <h3>Utasítások és operandusok</h3>
                <p>
                  Az utasításokat egymástól elkülönítve új sorba szükséges írni.<br></br>
                  Hogy kicsi betűvel (lda) vagy nagy betűvel (LDA) írjuk az utasításokat, az teljesen mindegy.<br></br>
                  A hexadecimális számoknál a betűket szintén mindegy, hogy kicsivel ($11ff) vagy naggyal ($11FF) írjuk.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Számok</h3>
                <p>
                  Decimális számok azonnali betöltésénél mindegy, hogy a szám elé teszünk-e nullákat, vagy sem.
                  (0015 és 15 szintén korrekt)<br></br>
                  Zéró lap címzésnél hexadecimális formában adjuk meg a memóriacímet. A hexadecimális memóriacímek tipikusan
                  két számjegyből állnak, viszont egy számjegyű számnál nem szükséges elé kitenni a nullát 
                  ($0a és $a szintén korrekt). Azt azonban fontos megjegyezni, hogy maximum 2 számjegyből álljon a szám, különben
                  abszolút címzésként fogja az assembler értelmezni.<br></br>
                  Abszolút címzésnél a cím tipikusan 4 számjegyből áll. Ennél a címzésnél szintén megtehetjük, hogy elhagyjuk a nullát
                  ($0ffa és $ffa szintén korrekt). Viszont 4 számjegynél többől nem állhat a cím (0-át beleértve).
                </p>
              </div>

              <div className='sub-div'>
                <h3>Kommentek</h3>
                <p>
                 A ';' szimbólumot követő rész egészen a sor végéig kommentnek számít és a kód feldolgozásának
                 kezdeti szakaszán törlésre kerül a sikeres gépi kódra való fordítás véget.
                 Utasítás, vagy egyéb kódrész után is írhatunk kommentet. Ez esetben viszont szükséges, hogy a
                 kódrészt és a ';' szimbólumot elválasszuk helyközzel.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Konstansok</h3>
                <p>
                  A konstansokat felhasználhatjuk mind címzéshez, mind azonnali értékek gyanánt. A konstansokat
                  azelőtt szükséges definiálni, hogy a kódban felhasználnánk, különben az asszembler hibát fog jelezni.
                  A konstansok értékét megadhatjuk tízes és hexadecimális számrendszerben egyaránt. Viszont a konstansok neve
                  kizárólag betűket, számokat és a '_' speciális karaktert tartalmazhatja. Egyéb szimbólumokat, szóközt nem tartalmazhat.
                  <br></br>A konstansok definiálása három lépésből áll:<br></br>
                  1. A 'define' kulcsszóval jelezzük, hogy konstanst akarunk definiálni.<br></br>
                  2. Szóközzel elválasztva az előző kulcsszótól megadjuk a konstans nevét.<br></br>
                  3. A névtől szóközzel elválasztva megadjuk a konstans értékét.
                  <br></br><br></br>
                  Példa hexa konstansra: define szam1 $fa<br></br>
                  Példa decimális konstansra: define szam2 8 <br></br>
                  Példa azonnali címzésre konstanssal: LDA #szam2<br></br>
                  Példa abszolút címzésre konstanssal: STA szam1<br></br>
                  A fenti két példa utasítást (és a konstansok definiálását) programként értelmezve a következőt csinálja: az $fa memóriacímre beírja a 8-as számot. 
                </p>
              </div>

              <div className='sub-div'>
                <h3>Stringek</h3>
                <p>
                  Az assembler segítségével stringeket is definiálhatunk, melyeket aztán megjeleníthetünk a konzolon.
                  A stringeket alkotó karaktereket az assembler ascii hexadecimális megfelelőjükre konvertálja.
                  Ekképpen tárolja őket a memóriában közvetlenül a programkód után.<br></br>
                  Stringek definiálásának lépései:<br></br>
                  1. A 'string' kulcsszóval jelezzük, hogy stringet akarunk definiálni.<br></br>
                  2. Szóközzel elválasztva az előző kulcsszótól megadjuk a string nevét.<br></br>
                  3. "" szimbólumok közé beírjuk a definiálni kívánt stringet.
                  <br></br><br></br>
                  Példa string definiálására: string hello "Hello world"
                </p>
              </div>

              <div className='sub-div'>
                <h3>Címkék (Labels)</h3>
                <p>
                  A címkék elsősorban arra szolgálnak, hogy az adott programkód részre tudjuk hivatkozni
                  ugrásnál, elágazásnál. Így nem kell nekünk kiszámolnunk, hogy az a kódrész, ahová ugrani szeretnénk
                  melyik memóriacímen lesz található. Másrészt a címkék átláthatóbbá teszik a kódunkat. A címkék egyedül betűből és
                  a '_' speciális karakterből állhatnak. Számokat, egyéb karaktereket, szóközöket nem tartalmazhatnak.
                  <br></br>Címke definiálásának lépései:<br></br>
                  1. Megadjuk a címke nevét.<br></br>
                  2. ':' szimbólumot írunk közvetlenül a név után.<br></br>
                  3. Új sorba kezdjük a címkéhez tartozó kódot.
                  <br></br><br></br>
                  Példa a címke és hozzátartozó kódrész megadására:<br></br>
                  ment:<br></br>
                  LDA #3<br></br>
                  STA $f1
                </p>
              </div>
          </div>
      </div>

      <div id="címzés" className='center-format'>
          <div id="monitor" className='inst-div'>
              <h2>Monitor</h2>
              <div className='sub-div'>
                <h3>Bevezetés</h3>
                <p>
                  A monitor 32x32 pixelből áll. A $200 és $5ff közötti memóriahelyek értékei meghatározzák a monitor 
                  pixeleinek színét. A különböző értékek különböző színű pixeleket rajzolnak ki. A $200-as memóriahely
                  a bal felső pixelhez tartozik, innen jobbra haladunk egészen a sor végéig, majd jön a következő sor.
                  A monitor a program futása kezdetén üres (fekete színű lesz minden pixel, mivel a
                  memória nullázódik futtatás előtt).
                </p>
              </div>

              <div className='sub-div'>
                <h3>Színek</h3>
                <p>
                  A színek és az azt kódoló értékek a következők:<br></br>
                  $0: Fekete<br></br>
                  $1: Fehér<br></br>
                  $2: Piros<br></br>
                  $3: Cián<br></br>
                  $4: Lila<br></br>
                  $5: Zöld<br></br>
                  $6: Kék<br></br>
                  $7: Sárga<br></br>
                  $8: Narancs<br></br>
                  $9: Barna<br></br>
                  $a: Világosvörös<br></br>
                  $b: Sötétszürke<br></br>
                  $c: Szürke<br></br>
                  $d: Világoszöld<br></br>
                  $e: Világoskék<br></br>
                  $f: Világosszürke
                  <br></br><br></br>
                  A monitor pixelei akkor is a fenti színek egyikét veszik fel, ha a pixelhez tartozó memóriahely
                  értéke nagyobb, mint $f.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Monitor megjelenítés</h3>
                <p>
                  A monitoron megjelenítéshez nem tartozik semmilyen szubrutinhívás. Egyszerűen csak a memória
                  tartalmának megváltoztatásával érjük el a pixelek színének változását, ami sok más monitortól
                  független célból is megtörténhet. Éppen ezért a monitor magától nem fog megjelenni. Olyan program 
                  esetén, ami a monitort használja fel, a kód futtatása előtt érdemes megnyitni a monitort.
                  Ezt a 'Monitor' gombra kattintva tehetjük meg. 
            
                </p>
              </div>
          </div>
      </div>

      <div id="címzés" className='center-format'>
          <div id="konzol" className='inst-div'>
              <h2>Konzol</h2>
              <div className='sub-div'>
                <h3>Bevezetés</h3>
                <p>A konzol kezdetben nem tartalmaz semmi kiírást. Legegyszerűbben úgy tudunk kiírni statikus
                   szöveget, ha azt először stringként definiáljuk (stringekről leírás: Assembler - Stringek).
                   Persze egyszerre csak egy karaktert tudunk kiírni. A konzol nem csak kiírást, hanem a bekérést is lehetővé teszi.
                   Csak az esetben tudunk karakter(eket) beírni a konzolba, ha a program azt kéri tőlünk.
                   Amennyiben a program kiír, vagy bekér egy karaktert és a konzol nincs megnyitva, a program 
                   megnyitja a konzolt.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Karakter kiírás</h3>
                <p>
                  Ahhoz, hogy kiírjunk egy karaktert szubrutinhívást (JSR utasítás) kell intéznünk az $ffd2 célcímmel.
                  Az ezen a címen elérhető szubrutin előre definiált. A konzol a szubrutin hívásra azt a karaktert
                  fogja megjeleníteni, amelynek ascii kódja az akkumulátorban található.
                  <br></br><br></br>
                  Példa az 'a' betű kiírására:<br></br>
                  LDA #65<br></br>
                  JSR $ffd2
                </p>
              </div>

              <div className='sub-div'>
                <h3>String kiírás</h3>
                <p>
                  Ezt a folyamatot érdemes címkével kódegységként elkülöníteni (a kódrész neve legyen 'kiírás'). String kiírásához az akkumulátoron kívül szükségünk lesz az X, vagy Y index regiszter valamelyikére.
                  Az index regiszter valamelyike offset ként fog szolgálni. Az offset határozza meg, hogy a string hányadik
                  karakterét szeretnék kiírni. Kiírás után mindig növeljük az X, vagy Y regiszter értékét és ugrunk a kiírás kódrészhez.
                  Ezen kívül tudnunk kell, hogy hány karakterből áll a kiírandó string. Az előbb említett ciklust addig folytatjuk,
                  amíg az offsetként használt index regiszter értéke el nem éri a string hosszát.<br></br><br></br>
                  Példa string kiírásra:<br></br>
                  string hello "Hello world"<br></br>
                  kiir:<br></br>
                  lda hello,x<br></br>
                  jsr $ffd2<br></br>
                  inx<br></br>
                  cpx #11<br></br>
                  bne kiir
                </p>
              </div>

              <div className='sub-div'>
                <h3>Karakter bekérés</h3>
                <p>
                  Ahhoz, hogy bekérjünk egy karaktert szubrutinhívást (JSR utasítás) kell intéznünk az $ff9f célcímmel.
                  Az ezen a címen elérhető szubrutin előre definiált. Ekkor a konzolon a kurzor villogni fog azon a helyen,
                  ahol a begépelendő karakter meg fog jelenni. Ez addig tart, amíg be nem gépelünk egy karaktert, csakis ezután
                  fog tovább futni a program. A szubrutinhívásra begépelt karakter automatikusan megjelenik. Amennyiben a begépelt
                  karakterrel tovább szeretnénk dolgozni, megtaláljuk a karaktert ascii kódját az $ff memóriacímen.
                </p>
              </div>
          </div>
      </div>

      <div id="címzés" className='center-format'>
          <div id="decimális" className='inst-div'>
              <h2>Decimális mód</h2>

              <div className='sub-div'>
                <h3>Aritmetikai üzemmódok</h3>
                <p>
                  Az összeadás (ADC) és kivonás (SBC) bináris vagy BCD (Binary Coded Decimal) eredményt adhat. 
                  D (decimális) flag határozza meg, hogy bináris eredményt (D flag nulla) vagy BCD eredményt 
                  (D flag bebillentve) produkáljon az aritmetikai művelet. Tehát a D flag kiválasztja a processzor
                  aritmetikai üzemmódját. Amikor a D jelző értéke nulla bináris módról beszélhetünk, míg ha a D jelző
                  értéke 1 formálisan decimális módról (informálisan BCD mód).
                </p>
              </div>

              <div className='sub-div'>
                <h3>BCD (Binary Coded Decimal)</h3>
                <p>
                  Egy bájt 256 lehetséges értékkel rendelkezik, amelyek hexéban $00-tól $FF-ig terjednek. 
                  Ezek az értékek reprezentálhatnak számokat. A számok reprezentálásának legelterjedtebb módja a 
                  bináris szám (pontosabban előjel nélküli bináris egész szám), ahol a bináris szám $00 és $FF (0 - 255)
                  közötti intervallumból vehet fel értéket. <br></br>
                  A BCD-ben egy bájt egy 0 és 99 közötti számot jelöl, ahol a $00 és $09 között egy 0 és 9 közötti 
                  számot reprezentál, $10 és $19 között 10 és 19 közötti számot reprezentál, és így tovább egészen $90 és $99
                  közöttig.Más szóval a BCD-szám felső számjegye a bájt felső 4 bitjében, az alsó számjegy pedig
                  az alsó 4 bitben tárolódik. Ezt a 100 értéket nevezzük érvényes BCD-számoknak. A bájt többi 156
                  lehetséges értékét (ahol egyik vagy mindkét hexa számjegy A-tól F-ig terjed) 
                  érvénytelen BCD-számoknak nevezzük. Ezzel szemben egy bájt mind a 256 lehetséges értéke
                  érvényes bináris szám.<br></br><br></br>
                  Példaként, ha a $28 számot BCD számként értelmezzük, akkor tízes (decimális) számrendszerben
                  ez 28-at reprezentál, míg ugyanazt bináris számként értelmezve tízes számrendszerben 40-et jelent.
                </p>
              </div>

              <div className='sub-div'>
                <h3>BCD aritmetika</h3>
                <p>
                 BCD aritmetikában hexadecimális számként határozzuk meg az operandusokat és az eredmény minden esetben
                 $0 - $99 közötti szám lesz. A hexadecimális számokat a BCD összeadás és kivonás úgy kezeli, mintha decimális
                 számok volnának. Bináris üzemmódban a kivonásnak van egy körkörös hatása.
                 Például $00 - $01 = $FF (és a carry flag nulla lesz). Decimális üzemmódban hasonló körkörös
                 hatás érvényesül: $00 - $01 = $99 (és a carry flag nulla lesz). A továbbiakban néhány 
                 példával illusztrálom a BCD aritmetika működését.<br></br><br></br>
                 1. példa (BCD összeadás: 12 + 34 = 46):<br></br>
                 SED ;decimális módra kapcsolás<br></br>
                 CLC ;carry flag nullázása<br></br>
                 LDA #$12<br></br>
                 ADC #$34 ;Az utasítás után: C = 0, A = $46<br></br><br></br>

                 2. példa (BCD összeadás: 58 + 46 = 104):<br></br>
                 SED<br></br>
                 CLC<br></br>
                 LDA #$58<br></br>
                 ADC #$46 ;Az utasítás után: C = 1, A = $04<br></br><br></br>

                 3. példa (BCD kivonás: 50 - 42 = 8):<br></br>
                 SED<br></br>
                 SEC<br></br>
                 LDA #$50<br></br>
                 SBC #$42 ;Az utasítás után: C = 1, A = $08<br></br><br></br>

                 4. példa (BCD kivonás: 12 - 21):<br></br>
                 SED<br></br>
                 SEC<br></br>
                 LDA #$12<br></br>
                 SBC #$21 ;Az utasítás után: C = 0, A = $91<br></br><br></br>

                </p>
              </div>
          </div>
      </div>

      <div id="egyéb" className='center-format'>
          <div className='inst-div'>
            <h2>Egyéb tudnivalók</h2>

            <div className='sub-div'>
                <h3>Memória tartalma</h3>
                <p>
                  Hexadecimális számrendszerben adhatjuk meg azt a memóriacímet, melynek tartalma minket érdekel.
                  Nem kell a szám elé kirakni a '$' szimbólumot (elég pl. ff1a). Az általunk lekért memóriahelyet zöld
                  színnel jelöli ki a rendszer. A begépelt memóriahelyen kívül minden esetben 15 (összesen 16)
                  memóriahely értékét jeleníti meg az alrendszer. A további 15 érték a felkeresett memóriahely utáni
                  memóriahelyekhez tartoznak (kivéve, ha nincs rá következő 15 memóriacím).       
                </p>
              </div>

              <div className='sub-div'>
                <h3>Kód futtatás</h3>
                <p>
                  Ahhoz, hogy futtathassunk egy kódot először az 'Assemble' gombra kattintással szükséges lefordítanunk.
                  Ezután akár a kód hexdumpját is megtekinthetjük (gépi kód hexadecimális számrendszerben, az utasításokhoz memóriacímmel rendelve).
                  A 'Futtatás' gomb a kódot az elejétől a végéig lefuttatja. Valahányszor újra futtatjuk a kódot a processzor
                  állapota inicializálódik. Ez azt takarja, hogy az akkumulátor és az index regiszterek értéke nulla lesz, a flagek és a memória 
                  szintén nullázódik (kivéve a kódot tároló memóriaszegmenst), a program számláló visszaáll az első
                  utasításra.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Futtatás soronként</h3>
                <p>
                  Valahányszor rákattintunk a 'Futtatás soronként' gombra mindig egy utasítás hajtódik végre.
                  Miután a kód valamennyi utasítása végrehajtódott a gomb megnyomhatatlanná válik. Ahhoz,
                  hogy újra soronként futtathassuk le a kódot az 'Assemble' gombra kell kattintanunk ('Futtatás' gombra kattintás
                  után szintén újra futtathatóvá válik soronként). Soronkénti futás közben a 'Futtatás' gombra kattintva bármikor
                  reszetelhetjük a rendszer állapotát és függetlenül attól, hogy hanyadik sornál tartottunk elölről fog lefutni a kód.
                </p>
              </div>

              <div className='sub-div'>
                <h3>Leállítás</h3>
                <p>
                  A kód futását leállíthatjuk a 'Stop' gombra kattintva. Ezután a sorra következő utasítástól
                  nem tudjuk folytatni a program futását. A 'Futtatás' gombra kattintva elölről fog futni a
                  program, ezáltal az előző állapot elveszik.
                </p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Guide
