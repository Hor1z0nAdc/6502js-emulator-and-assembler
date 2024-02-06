import React from 'react'

const Instructions = () => {
  return (
    <div>
      <div className='inst-body'> 
      <table>
        <tr className='table-head'>
          <th>Betöltés</th>
          <th>Mentés</th>
          <th>Transzferálás</th>
          <th>Stack</th>
          <th>Dek/Inkrementálás</th>
          <th>Logika</th>
          <th>Aritmetika</th>
          <th>Eltolás/Rotáció</th>
          <th>Elágazás</th>
          <th>Flag</th>
          <th>kontrol</th>
        </tr>
        <tr>
          <td><a href="#lda">LDA</a></td>
          <td><a href="#sta">STA</a></td>
          <td><a href="#tax">TAX</a></td>
          <td><a href="#pha">PHA</a></td>
          <td><a href="#dec">DEC</a></td>
          <td><a href="#and">AND</a></td>
          <td><a href="#adc">ADC</a></td>
          <td><a href="#asl">ASL</a></td>
          <td><a href="#bcc">BCC</a></td>
          <td><a href="#clc">CLC</a></td>
          <td><a href="#brk">BRK</a></td>
        </tr>
        <tr>
          <td><a href="#ldx">LDX</a></td>
          <td><a href="#stx">STX</a></td>
          <td><a href="#tay">TAY</a></td>
          <td><a href="#php">PLA</a></td>
          <td><a href="#dex">DEX</a></td>
          <td><a href="#bit">BIT</a></td>
          <td><a href="#sbc">SBC</a></td>
          <td><a href="#lsr">LSR</a></td>
          <td><a href="#bcs">BCS</a></td>
          <td><a href="#cld">CLD</a></td>
          <td><a href="#jmp">JMP</a></td>
        </tr>
        <tr>
          <td><a href="#ldy">LDY</a></td>
          <td><a href="#sty">STY</a></td>
          <td><a href="#tax">TSX</a></td>
          <td><a href="#pla">PHP</a></td>
          <td><a href="#dey">DEY</a></td>
          <td><a href="#eor">EOR</a></td>
          <td><a href="#cmp">CMP</a></td>
          <td><a href="#rol">ROL</a></td>
          <td><a href="#beq">BEQ</a></td>
          <td><a href="#cli">CLI</a></td>
          <td><a href="#jsr">JSR</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><a href="#txa">TXA</a></td>
          <td><a href="#plp">PLP</a></td>
          <td><a href="#inc">INC</a></td>
          <td><a href="#ora">ORA</a></td>
          <td><a href="#cpx">CPX</a></td>
          <td><a href="#ror">ROR</a></td>
          <td><a href="#bmi">BMI</a></td>
          <td><a href="#clv">CLV</a></td>
          <td><a href="#rti">RTI</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><a href="#txs">TXS</a></td>
          <td></td>
          <td><a href="#inx">INX</a></td>
          <td></td>
          <td><a href="#cpy">CPY</a></td>
          <td></td>
          <td><a href="#bne">BNE</a></td>
          <td><a href="#sec">SEC</a></td>
          <td><a href="#rts">RTS</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><a href="#tya">TYA</a></td>
          <td></td>
          <td><a href="#iny">INY</a></td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="#bpl">BPL</a></td>
          <td><a href="#sed">SED</a></td>
          <td><a href="#nop">NOP</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="#bvc">BVC</a></td>
          <td><a href="#sei">SEI</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="#bvs">BVS</a></td>
        </tr>
      </table>
      </div>

      <div className='center-format'>
        <div id="lda" className='inst-div'>
          <h2>LDA - Memória betöltése az akkumulátorba (Load Accumulator with Memory)</h2>
          <div className='span-div'>
            <span>Művelet: Memória &rarr; Akkumulátor</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>Az adat a címzett memóriacellából az akkumulátorba kerül. Bebillenti a zero flaget, ha az 
            utasítás eredményeként az akkumulátor értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az akkumulátor hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>LDA #$nn</td>
              <td>$A9</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>LDA $nnnn</td>
              <td>$AD</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>LDA $nnnn,X</td>
              <td>$BD</td>
              <td>3</td>
              <td>4+p</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>LDA $nnnn,Y</td>
              <td>$B9</td>
              <td>3</td>
              <td>4+p</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>LDA $nn</td>
              <td>$A5</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>LDA $nn,X</td>
              <td>$B5</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>LDA ($nn,X)</td>
              <td>$A1</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>LDA ($nn),Y</td>
              <td>$B1</td>
              <td>2</td>
              <td>5+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
        </div>

        <div id="ldx" className='inst-div'>
          <h2>LDX - Memória betöltése az X regiszterbe (Load Index Register X From Memory)</h2>
          <div className='span-div'>
            <span>Művelet: Memória &rarr; X regiszter</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>Az adat a címzett memóriacellából az X regiszterbe kerül. Bebillenti a zero flaget, ha az 
            utasítás eredményeként az X regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az X regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>LDX #$nn</td>
              <td>$A2</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>LDX $nnnn</td>
              <td>$AE</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>LDX $nnnn,Y</td>
              <td>$BE</td>
              <td>3</td>
              <td>4+p</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>LDX $nn</td>
              <td>$A6</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Y-indexelt zéró lap</td>
              <td>LDX $nn,Y</td>
              <td>$B6</td>
              <td>2</td>
              <td>4</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
        </div>

        <div id="ldy" className='inst-div'>
          <h2>LDY - Memória betöltése az Y regiszterbe (Load Index Register Y From Memory)</h2>
          <div className='span-div'>
            <span>Művelet: Memória &rarr; Y regiszter</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>Az adat a címzett memóriacellából az Y regiszterbe kerül. Bebillenti a zero flaget, ha az 
            utasítás eredményeként az Y regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az Y regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>LDY #$nn</td>
              <td>$A0</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>LDY $nnnn</td>
              <td>$AC</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>LDY $nnnn,X</td>
              <td>$BC</td>
              <td>3</td>
              <td>4+p</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>LDY $nn</td>
              <td>$A4</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>LDY $nn,X</td>
              <td>$B4</td>
              <td>2</td>
              <td>4</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
        </div>

        <div id="sta" className='inst-div'>
          <h2>STA - Akkumulátor mentése memóriába (Store Accumulator in Memory)</h2>
          <div className='span-div'>
            <span>Művelet: Akkumulátor &rarr; Memória</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>Ez az utasítás átviszi az akkumulátor tartalmát a megadott memóriacellába.
          Ezen kívül semmi mást nem befolyásol.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>STA $nnnn</td>
              <td>$8D</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>STA $nnnn,X</td>
              <td>$9D</td>
              <td>3</td>
              <td>5</td>
            </tr>
            <tr>
            <td>Y-indexelt abszolút</td>
              <td>STA $nnnn,Y</td>
              <td>$99</td>
              <td>3</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>STA $nn</td>
              <td>$85</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>STA $nn,X</td>
              <td>$95</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>STA ($nn,X)</td>
              <td>$81</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>STA ($nn),Y</td>
              <td>$91</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="stx" className='inst-div'>
          <h2>STX - X regiszter tárolása memóriába (Store Register X in Memory)</h2>
          <div className='span-div'>
            <span>Művelet: X regiszter &rarr; Memória</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>Ez az utasítás átmásolja az X regiszter tartalmát a címzett memóriacellába.
          Ezen kívül semmi mást nem befolyásol.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>STX $nnnn</td>
              <td>$8E</td>
              <td>3</td>
              <td>4</td>
            </tr>           
            <tr>
              <td>Zéró lap</td>
              <td>STA $nn</td>
              <td>$86</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Y-indexelt zéró lap</td>
              <td>STA $nn,Y</td>
              <td>$96</td>
              <td>2</td>
              <td>4</td>
            </tr>
          </table>
        </div>

        <div id="sty" className='inst-div'>
          <h2>STY - Y regiszter tárolása memóriába (Store Register X in Memory)</h2>
          <div className='span-div'>
            <span>Művelet: Y regiszter &rarr; Memória</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>Ez az utasítás átmásolja az Y regiszter tartalmát a címzett memóriacellába.
          Ezen kívül semmi mást nem befolyásol.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>STY $nnnn</td>
              <td>$8C</td>
              <td>3</td>
              <td>4</td>
            </tr>           
            <tr>
              <td>Zéró lap</td>
              <td>STY $nn</td>
              <td>$84</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>STY $nn,X</td>
              <td>$94</td>
              <td>2</td>
              <td>4</td>
            </tr>
          </table>
        </div>

        <div id="tax" className='inst-div'>
          <h2>TAX - Akkumulátor átvitele X regiszterbe (Transfer accumulator to X register)</h2>
          <div className='span-div'>
            <span>Művelet: Akkumulátor &rarr; X regiszter</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>
            Ez az utasítás átmásolja az akkumulátor tartalmát az X regiszterbe.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az X regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az X regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>TAX</td>
              <td>$AA</td>
              <td>1</td>
              <td>2</td>
            </tr>           
          </table>
        </div>

        <div id="tay" className='inst-div'>
          <h2>TAY - Akkumulátor átvitele Y regiszterbe (Transfer accumulator to Y register)</h2>
          <div className='span-div'>
            <span>Művelet: Akkumulátor &rarr; Y regiszter</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>
            Ez az utasítás átmásolja az akkumulátor tartalmát az Y regiszterbe.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az Y regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az Y regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>TAY</td>
              <td>$A8</td>
              <td>1</td>
              <td>2</td>
            </tr>           
          </table>
        </div>

        <div id="tsx" className='inst-div'>
          <h2>TSX - Verem mutató átvitele Y regiszterbe (Transfer Stack Pointer to X Register)</h2>
          <div className='span-div'>
            <span>Művelet: S &rarr; X regiszter</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>
            Ez az utasítás átmásolja a verem mutató tartalmát az X regiszterbe.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az X regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az X regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>TSX</td>
              <td>$BA</td>
              <td>1</td>
              <td>2</td>
            </tr>           
          </table>
        </div>

        <div id="txa" className='inst-div'>
          <h2>TXA - X regiszter átvitele akkumulátorba (Transfer X register to accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: X regiszter &rarr; akkumulátor</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>
            Ez az utasítás átmásolja az X regiszter tartalmát az akkumulátorba.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az akkumulátor értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az akkumulátor hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>TXA</td>
              <td>$8A</td>
              <td>1</td>
              <td>2</td>
            </tr>           
          </table>
        </div>

        <div id="txs" className='inst-div'>
          <h2>TXS - X regiszter átvitele a verem mutatóba (Transfer X register to stack pointer)</h2>
          <div className='span-div'>
            <span>Művelet: X regiszter &rarr; S</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
            Ez az utasítás átmásolja az X regiszter tartalmát a verem mutatóba.
            Ezen kívül semmi mást nem befolyásol.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>TXS</td>
              <td>$9A</td>
              <td>1</td>
              <td>2</td>
            </tr>           
          </table>
        </div>

        <div id="tya" className='inst-div'>
          <h2>TYA - Y regiszter átvitele az akkumulátorba (Transfer Y register to accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: Y regiszter &rarr; akkumulátor</span>
            <span className='inst-span'>Befolyásolt flagek: N Z</span>
          </div>
          <p className='span-div'>
            Ez az utasítás átmásolja az Y regiszter tartalmát az akkumulátorba.
            Bebillenti a zero flaget, ha az utasítás eredményeként az akkumulátor értéke nulla, 
            különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az akkumulátor hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>TYA</td>
              <td>$9</td>
              <td>1</td>
              <td>2</td>
            </tr>           
          </table>
        </div>

        <div id="pha" className='inst-div'>
          <h2>PHA - Akkumulátor rárakása a veremre (Push Accumulator On Stack)</h2>
          <div className='span-div'>
            <span>Művelet: P&darr;</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          Ez az utasítás az akkumulátor aktuális értékét átviszi a verem következő helyére, automatikusan 
          dekrementálva a vermet, hogy a következő üres helyre mutasson.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>PHA</td>
              <td>$48</td>
              <td>1</td>
              <td>3</td>
            </tr>           
          </table>
        </div>

        <div id="pla" className='inst-div'>
          <h2>PLA - Akkumulátor levétele a veremről (Pull Accumulator From Stack)</h2>
          <div className='span-div'>
            <span>Művelet: P&uarr;</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          Ez az utasítás az akkumulátor aktuális értékét átviszi a verem következő helyére, automatikusan 
          dekrementálva a vermet, hogy a következő üres helyre mutasson.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>PLA</td>
              <td>$68</td>
              <td>1</td>
              <td>3</td>
            </tr>           
          </table>
        </div>

        <div id="php" className='inst-div'>
          <h2>PHP - Processzor státusz rárakása a veremre (Push Processor Status On Stack)</h2>
          <div className='span-div'>
            <span>Művelet: P↓;</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          Ez az utasítás a processzor státusz regiszter aktuális értékét átviszi a verem következő helyére, automatikusan 
          dekrementálva a vermet, hogy a következő üres helyre mutasson.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>PHP</td>
              <td>$08</td>
              <td>1</td>
              <td>3</td>
            </tr>           
          </table>
        </div>

        <div id="plp" className='inst-div'>
          <h2>PLP - processzor státusz levétele a veremről (Pull Processor Status From Stack)</h2>
          <div className='span-div'>
            <span>Művelet: P&uarr;</span>
            <span className='inst-span'>Befolyásolt flagek: N V D I Z C</span>
          </div>
          <p className='span-div'>
          Ez az utasítás a verem következő értékét átviszi a státusz regiszterbe, 
          ezáltal az összes flaget megváltoztatja.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>PLP</td>
              <td>$28</td>
              <td>1</td>
              <td>4</td>
            </tr>           
          </table>
        </div>

        <div id="dec" className='inst-div'>
          <h2>DEC - Memória csökkentése eggyel (Decrement Memory By One)</h2>
          <div className='span-div'>
            <span>Művelet: M - 1 → M</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Ez az utasítás a memóriacímen található értékből kivon 1-et.Bebillenti a zero flaget, ha az 
            utasítás eredményeként a megcímzett memóriarekesz értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után a megcímzett memóriarekesz hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>DEC $nnnn</td>
              <td>$CE</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>DEC $nnnn,X</td>
              <td>$DE</td>
              <td>3</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>DEC $nn</td>
              <td>$C6</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>DEC $nn,X</td>
              <td>$D6</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="dex" className='inst-div'>
          <h2>DEX - Regiszter X csökkentése eggyel (Decrement Index Register X By One)</h2>
          <div className='span-div'>
            <span>Művelet: X - 1 → X</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Ez az utasítás az X regiszter értékből kivon 1-et.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az X regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az X regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>DEX</td>
              <td>$CA</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="dey" className='inst-div'>
          <h2>DEY - Regiszter Y csökkentése eggyel (Decrement Index Register Y By One)</h2>
          <div className='span-div'>
            <span>Művelet: Y - 1 → Y</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Ez az utasítás az Y regiszter értékből kivon 1-et.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az Y regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az Y regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>DEY</td>
              <td>$88</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="inc" className='inst-div'>
          <h2>INC - Memória növelése eggyel (Increment Memory By One)</h2>
          <div className='span-div'>
            <span>Művelet: M + 1 → M</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Ez az utasítás a memóriacímen található értékhez hozzáad 1-et.Bebillenti a zero flaget, ha az 
            utasítás eredményeként a megcímzett memóriarekesz értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után a megcímzett memóriarekesz hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>INC $nnnn</td>
              <td>$EE</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>INC $nnnn,X</td>
              <td>$FE</td>
              <td>3</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>INC $nn</td>
              <td>$E6</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>INC $nn,X</td>
              <td>$F6</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="inx" className='inst-div'>
          <h2>INX - Regiszter X növelése eggyel (Increment Index Register X By One)</h2>
          <div className='span-div'>
            <span>Művelet: X + 1 → X</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Ez az utasítás az X regiszter értékéhez hozzáad 1-et.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az X regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az X regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>INX</td>
              <td>$E8</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="iny" className='inst-div'>
          <h2>INY - Regiszter Y növelése eggyel (Increment Index Register Y By One)</h2>
          <div className='span-div'>
            <span>Művelet: Y + 1 → Y</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Ez az utasítás az Y regiszter értékéhez hozzáad 1-et.Bebillenti a zero flaget, ha az 
            utasítás eredményeként az Y regiszter értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az Y regiszter hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>INY</td>
              <td>$C8</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="and" className='inst-div'>
          <h2>AND - "ÉS" művelet akkumulátoron ("AND" Memory with Accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: A ∧ M → A</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Az AND utasítás az akkumulátort és a memóriát átadja az összeadó modulnak, amely 
            bitről-bitre elvégzi az AND műveletet, és az eredményt visszatárolja az akkumulátorba.
            Bebillenti a zero flaget, ha az 
            utasítás eredményeként az akkumulátor értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az akkumulátor hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>AND #$nn</td>
              <td>$29</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>AND $nnnn</td>
              <td>$2D</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>AND $nnnn,XX</td>
              <td>$3D</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>AND $nnnn,Y</td>
              <td>$39</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>AND $nn</td>
              <td>$25</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>AND $nn,X</td>
              <td>$35</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>AND ($nn,X)</td>
              <td>$21</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>AND ($nn),Y</td>
              <td>$31</td>
              <td>2</td>
              <td>5+</td>
            </tr>
          </table>
        </div>

        <div id="bit" className='inst-div'>
          <h2>BIT - Memóriában lévő bitek tesztelése akkumulátorral (Test Bits in Memory with Accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: A ∧ M, M7 → N, M6 → V</span>
            <span className='inst-span'>Befolyásolt flagek: N V Z </span>
          </div>
          <p className='span-div'>
          Ez az utasítás ÉS műveletet hajt végre egy memóriarekesz tartalma és az akkumulátor között, de 
          az ÉS művelet eredményét nem tárolja el az akkumulátorban. A bitutasítás az N flaget úgy 
          befolyásolja, hogy az N a vizsgált memória 7-es bitjének értékére, a V flagetúgy, hogy a V-t a 
          vizsgált memória 6-os bitjének értékére állítja be. Bebillenti a zero flaget, ha az 
          eredmény értéke nulla, különben a zero flag értéke nulla lesz.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>BIT $nnnn</td>
              <td>$2C</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>BIT $nn</td>
              <td>$24</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </table>
        </div>

        <div id="eor" className='inst-div'>
          <h2>EOR - "Kizáró vagy" művelet az akkumulátoron ("Exclusive OR" Memory with Accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: A ⊻ M → A</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Az EOR utasítás az akkumulátort és a memóriát átadja az összeadó modulnak, amely 
            bitről-bitre elvégzi az EOR műveletet, és az eredményt visszatárolja az akkumulátorba.
            Bebillenti a zero flaget, ha az 
            utasítás eredményeként az akkumulátor értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az akkumulátor hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>EOR #$nn</td>
              <td>$49</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>EOR $nnnn</td>
              <td>$4D</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>EOR $nnnn,X</td>
              <td>$5D</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>EOR $nnnn,Y</td>
              <td>$59</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>EOR $nn</td>
              <td>$45</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>EOR $nn,X</td>
              <td>$55</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>EOR ($nn,X)</td>
              <td>$41</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>EOR ($nn),Y</td>
              <td>$51</td>
              <td>2</td>
              <td>5+</td>
            </tr>
          </table>
        </div>

        <div id="ora" className='inst-div'>
          <h2>ORA - "Vagy" művelet az akkumulátoron ("OR" Memory with Accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: A ∨ M → A</span>
            <span className='inst-span'>Befolyásolt flagek: N Z </span>
          </div>
          <p className='span-div'>
            Az ORA utasítás az akkumulátort és a memóriát átadja az összeadó modulnak, amely 
            bitről-bitre elvégzi az OR műveletet, és az eredményt visszatárolja az akkumulátorba.
            Bebillenti a zero flaget, ha az 
            utasítás eredményeként az akkumulátor értéke nulla, különben a zero flag értéke nulla lesz.
            Bebillenti a negative flaget, ha a végrehajtás után az akkumulátor hetedik bitje egyes,
            különben a negative flag értéke nulla lesz. 
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>ORA #$nn</td>
              <td>$09</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>ORA $nnnn</td>
              <td>$0D</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>ORA $nnnn,X</td>
              <td>$1D</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>ORA $nnnn,Y</td>
              <td>$19</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>ORA $nn</td>
              <td>$05</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>ORA $nn,X</td>
              <td>$15</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>ORA ($nn,X)</td>
              <td>$01</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>ORA ($nn),Y</td>
              <td>$11</td>
              <td>2</td>
              <td>5+</td>
            </tr>
          </table>
        </div>

        <div id="adc" className='inst-div'>
          <h2>ADC - Memória hozzáadása akkumulátorhoz carry-vel (Add Memory to Accumulator with Carry)</h2>
          <div className='span-div'>
            <span>Művelet: A + M + C → A, C</span>
            <span className='inst-span'>Befolyásolt flagek: N V Z C </span>
          </div>
          <p className='span-div'>
          Ez az utasítás a memória értékét és az előző műveletből származó carry értékét 
          hozzáadja az akkumulátor értékéhez, és az eredményt az akkumulátorban tárolja. A carry flag-et 
          bebillenti, ha a bináris összeadás összege meghaladja a 255-öt, vagy ha a decimális összeadás 
          összege meghaladja a 99-et, egyébként a carry értéke 0 éesz. A overflow flag akkor kerül bebillentésre, 
          amikor az előjel vagy a 7-es bit megváltozik, mert az eredmény meghaladja a +127 vagy -128 értéket, 
          egyébként az overflow flag értéke 0 lesz.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>ADC #$nn</td>
              <td>$69</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>ADC $nnnn</td>
              <td>$6D</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>ADC $nnnn,X</td>
              <td>$7D</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>ADC $nnnn,Y</td>
              <td>$79</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>ADC $nn</td>
              <td>$65</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>ADC $nn,X</td>
              <td>$75</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>ADC ($nn,X)</td>
              <td>$61</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>ADC ($nn),Y</td>
              <td>$71</td>
              <td>2</td>
              <td>5+</td>
            </tr>
          </table>
        </div>

        <div id="sbc" className='inst-div'>
          <h2>SBC - Memória kivonása akkumulátorból borrow-val (Add Memory to Accumulator with Carry)</h2>
          <div className='span-div'>
            <span>Művelet: A - M - ~C → A</span>
            <span className='inst-span'>Befolyásolt flagek: N V Z C </span>
          </div>
          <p className='span-div'>
          Ez az utasítás kivonja a memória és a borrow értékét az akkumulátor értékéből 
          kettes komplement aritmetikával, és az eredményt az akkumulátorban tárolja. A borrow definíció 
          szerint a carry flag komplemense; ezért az eredményül kapott carry azt jelzi, hogy nem történt kölcsönzés.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>SBC #$nn</td>
              <td>$E9</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>SED $nnnn</td>
              <td>$6D</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>SBC $nnnn,X</td>
              <td>$FD</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>SBC $nnnn,Y</td>
              <td>$F9</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>SBC $nn</td>
              <td>$65</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>SBC $nn,X</td>
              <td>$F5</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>SBC ($nn,X)</td>
              <td>$E1</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>SBC ($nn),Y</td>
              <td>$F1</td>
              <td>2</td>
              <td>5+</td>
            </tr>
          </table>
        </div>

        <div id="cmp" className='inst-div'>
          <h2>CMP - Memória összehasonlítása akkumulátorral (Compare Memory and Accumulator)</h2>
          <div className='span-div'>
            <span>Művelet: A - M</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
            Ez az utasítás kivonja a megcímzett memóriarekesz tartalmát az akkumulátor tartalmából, viszont az akkumulátor 
            tartalma nem változik meg. Bebillenti a Z flaget, ha az akkumulátor egyenlő a címzett 
            memóriarekesz értékével, különben nullára állítja. Az eredmény hetedik bitje alapján az N flaget bebilelnti,
            vagy 0-ra állítja. Bebillenti a carry flaget, ha a memóriában lévő érték kisebb 
            vagy egyenlő az akkumulátorral, és 0-ra állítja, ha nagyobb, mint az akkumulátor.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>CMP #$nn</td>
              <td>$C9</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>CMP $nnnn</td>
              <td>$CD</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt abszolút</td>
              <td>CMP $nnnn,X</td>
              <td>$DD</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Y-indexelt abszolút</td>
              <td>CMP $nnnn,Y</td>
              <td>$D9</td>
              <td>3</td>
              <td>4+</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>CMP $nn</td>
              <td>$C5</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap</td>
              <td>CMP $nn,X</td>
              <td>$D5</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td>X-indexelt zéró lap indirekt</td>
              <td>CMP ($nn,X)</td>
              <td>$C1</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Zéró lap indirekt Y-indexelt</td>
              <td>CMP ($nn),Y</td>
              <td>$D1</td>
              <td>2</td>
              <td>5+</td>
            </tr>
          </table>
        </div>

        <div id="cpx" className='inst-div'>
          <h2>CPX - Memória összehasonlítása X regiszterrel (Compare Index Register X To Memory)</h2>
          <div className='span-div'>
            <span>Művelet: X - M</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
            Ez az utasítás kivonja a megcímzett memóriarekesz tartalmát az X regiszer tartalmából, viszont az X regiszer 
            tartalma nem változik meg. Bebillenti a Z flaget, ha az X regiszer egyenlő a címzett 
            memóriarekesz értékével, különben nullára állítja. Az eredmény hetedik bitje alapján az N flaget bebilelnti,
            vagy 0-ra állítja. Bebillenti a carry flaget, ha a memóriában lévő érték kisebb 
            vagy egyenlő az X regiszer értékével, és 0-ra állítja, ha nagyobb, mint az X regiszer.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>CPX #$nn</td>
              <td>$E0</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>CPX $nnnn</td>
              <td>$EC</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>CPX $nn</td>
              <td>$E4</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </table>
        </div>

        <div id="cpy" className='inst-div'>
          <h2>CPY - Memória összehasonlítása Y regiszterrel (Compare Index Register Y To Memory)</h2>
          <div className='span-div'>
            <span>Művelet: Y - M</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
            Ez az utasítás kivonja a megcímzett memóriarekesz tartalmát az Y regiszer tartalmából, viszont az Y regiszer 
            tartalma nem változik meg. Bebillenti a Z flaget, ha az Y regiszer egyenlő a címzett 
            memóriarekesz értékével, különben nullára állítja. Az eredmény hetedik bitje alapján az N flaget bebilelnti,
            vagy 0-ra állítja. Bebillenti a carry flaget, ha a memóriában lévő érték kisebb 
            vagy egyenlő az Y regiszer értékével, és 0-ra állítja, ha nagyobb, mint az Y regiszer.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Azonnali</td>
              <td>CPY #$nn</td>
              <td>$C0</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>CPY $nnnn</td>
              <td>$CC</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>CPY $nn</td>
              <td>$C4</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </table>
        </div>

        <div id="asl" className='inst-div'>
          <h2>ASL - Aritmetikai eltolás balra (Arithmetic Shift Left)</h2>
          <div className='span-div'>
            <span>Művelet: C ← /M7...M0/ ← 0</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
          A shift left utasítás vagy az akkumulátort, vagy a megcímzett memóriarekesz értékét tolja 1 bittel balra, a 0 
          bitet mindig 0-ra állítja, és a bemeneti 7-es bitet a carry flagben tárolja. A N bitet az eredmény 7-edik
          bitjére állítja, bebillenti a Z flaget, ha az eredmény 0, különben 0-ra állítja, a bemenet 7-edik bitjét
          a carry flag-be menti.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Akkumulátor</td>
              <td>ASL A</td>
              <td>$0A</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>ASL $nnnn</td>
              <td>$0E</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>X indexelt abszolút</td>
              <td>ASL $nnnn,X</td>
              <td>$1E</td>
              <td>3</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>ASL $nn</td>
              <td>$06</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>X indexelt zéró lap</td>
              <td>ASL $nn,X</td>
              <td>$16</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="lsr" className='inst-div'>
          <h2>LSR - Aritmetikai eltolás jobbra (Arithmetic Shift Right)</h2>
          <div className='span-div'>
            <span>Művelet: 0 → /M7...M0/ → C</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
          A shift right utasítás vagy az akkumulátort, vagy a megcímzett memóriarekesz értékét tolja 1 bittel 
          jobbra, úgy, hogy az eredmény magasabb bitje mindig 0-ra van állítva, és a mezőből eltolt 
          alacsony bitet a carry flagben tárolja. Az N flaget mindig 0-ra állítja, bebillenti a Z flaget, 
          ha az eredmény 0, különben 0-ra állítja, a bemenet 0-dik bitjét a carry flagbe menti.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Akkumulátor</td>
              <td>LSR A</td>
              <td>$4A</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>LSR $nnnn</td>
              <td>$4E</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>X indexelt abszolút</td>
              <td>LSR $nnnn,X</td>
              <td>$5E</td>
              <td>3</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>LSR $nn</td>
              <td>$46</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>X indexelt zéró lap</td>
              <td>LSR $nn,X</td>
              <td>$56</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="rol" className='inst-div'>
          <h2>ROL - Rotáció balra (Rotate Left)</h2>
          <div className='span-div'>
            <span>Művelet: C ← /M7...M0/ ← C</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
          A forgatás balra utasítás vagy az akkumulátort, vagy a címzett memóriát 1 bittel balra tolja, a 
          bemeneti carry-t a 0. bitben, a 7. bemeneti bitet pedig a carryben tárolja. A carry flaget a bemenet 7-ik
          bitjére állítja, A negatív flaget az input 6-ik bitjére állítja, bebillenti a Z flaget, 
          ha az eredmény 0, különben 0-ra állítja.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Akkumulátor</td>
              <td>ROL A</td>
              <td>$2A</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>ROL $nnnn</td>
              <td>$2E</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>X indexelt abszolút</td>
              <td>ROL $nnnn,X</td>
              <td>$3E</td>
              <td>3</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>ROL $nn</td>
              <td>$26</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>X indexelt zéró lap</td>
              <td>ROL $nn,X</td>
              <td>$36</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="ror" className='inst-div'>
          <h2>ROR - Rotáció jobbra (Rotate right)</h2>
          <div className='span-div'>
            <span>Művelet: C ← /M7...M0/ ← C</span>
            <span className='inst-span'>Befolyásolt flagek: N Z C </span>
          </div>
          <p className='span-div'>
          A forgatás jobbra utasítás vagy az akkumulátort, vagy a címzett memóriát 1 bittel jobbra tolja, a 
          bemeneti carry-t a 0. bitben, a 7. bemeneti bitet pedig a carryben tárolja. A carry flaget a bemenet 0-ik
          bitjére állítja, A negatív flaget az input carryre állítja, bebillenti a Z flaget, 
          ha az eredmény 0, különben 0-ra állítja.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Akkumulátor</td>
              <td>ROR A</td>
              <td>$6A</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>ROR $nnnn</td>
              <td>$6E</td>
              <td>3</td>
              <td>6</td>
            </tr>
            <tr>
              <td>X indexelt abszolút</td>
              <td>ROR $nnnn,X</td>
              <td>$7E</td>
              <td>3</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Zéró lap</td>
              <td>ROR $nn</td>
              <td>$66</td>
              <td>2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>X indexelt zéró lap</td>
              <td>ROR $nn,X</td>
              <td>$76</td>
              <td>2</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="bcc" className='inst-div'>
          <h2>BCC - Elágazás üres carry esetén (Branch on Carry Clear)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás C = 0-án</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a carry flag állapotát és feltétlesen elágazik, ha a carry flag értéke 0.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BCC $nnnn</td>
              <td>$90</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="bcs" className='inst-div'>
          <h2>BCS - Elágazás bebillentett carry esetén (Branch on Carry Set)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás C = 1-en</span>
            <span className='inst-span'></span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a carry flag állapotát és feltétlesen elágazik, ha a carry flag értéke 1.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BCS $nnnn</td>
              <td>$B0</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="beq" className='inst-div'>
          <h2>BEQ- Elágazás bebillentett zéro flag esetén (Branch on Result Zero)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás Z = 1-en</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a zéró flag állapotát és feltétlesen elágazik, ha a zéró flag értéke 1.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BEQ $nnnn</td>
              <td>$F0</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="bmi" className='inst-div'>
          <h2>BMI- Elágazás bebillentett negatív flag esetén (Branch on Result Minus)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás N = 1-en</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a negatív flag állapotát és feltétlesen elágazik, ha a negatív flag értéke 1.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BMI $nnnn</td>
              <td>$30</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="bne" className='inst-div'>
          <h2>BNE - Elágazás üres zérü flag esetén (Branch on Result Not Zero)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás Z = 0-án</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a zéró flag állapotát és feltétlesen elágazik, ha a zéró flag értéke 0.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BNE $nnnn</td>
              <td>$D0</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="bpl" className='inst-div'>
          <h2>BPL - Elágazás üres negatív flag esetén (Branch on Result Plus)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás N = 0-án</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a negatív flag állapotát és feltétlesen elágazik, ha a negatív flag értéke 0.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BPL $nnnn</td>
              <td>$10</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="bvc" className='inst-div'>
          <h2>BVC - Elágazás üres túlcsordulás flag esetén (Branch on Overflow Clear)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás V = 0-án</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a túlcsordulás flag állapotát és feltétlesen elágazik, ha a túlcsordulás flag értéke 0.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BVC $nnnn</td>
              <td>$50</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="bvs" className='inst-div'>
          <h2>BVS - Elágazás bebillentett túlcsordulás flag esetén (Branch on Overflow Set)</h2>
          <div className='span-div'>
            <span>Művelet: elágazás V = 1-en</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
              Ez az utasítás teszteli a túlcsordulás flag állapotát és feltétlesen elágazik, ha a túlcsordulás flag értéke 1.
              Egyedül a program számláló értékét változtatja meg, ha elágazás történik.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Relatív</td>
              <td>BVS $nnnn</td>
              <td>$70</td>
              <td>2</td>
              <td>2+t+p</td>
            </tr>
          </table>
          <span className='m-top'>+p: plusz 1 lap átlépés esetén</span>
          <span>+t: plusz 1, ha elágazás történt</span>
        </div>

        <div id="clc" className='inst-div'>
          <h2>CLC - Carry flag 0-ra állítása (Clear Carry Flag)</h2>
          <div className='span-div'>
            <span>Művelet: 0 → C</span>
            <span className='inst-span'>Befolyásolt flagek: C</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 0-ra inicizalizálja a carry flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>CLC</td>
              <td>$18</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="cld" className='inst-div'>
          <h2>CLD - Decimális flag 0-ra állítása (Clear Decimal Mode)</h2>
          <div className='span-div'>
            <span>Művelet: 0 → D</span>
            <span className='inst-span'>Befolyásolt flagek: D</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 0-ra inicizalizálja a decimális flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>CLD</td>
              <td>$D8</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="cli" className='inst-div'>
          <h2>CLI - Megszakítás kikapcsolása flag 0-ra állítása (Clear Interrupt Disable)</h2>
          <div className='span-div'>
            <span>Művelet: 0 → I</span>
            <span className='inst-span'>Befolyásolt flagek: I</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 0-ra inicizalizálja a megszakítás kikapcsolása flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>CLI</td>
              <td>$58</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="clv" className='inst-div'>
          <h2>CLV - Túlcsordulás flag 0-ra állítása (Clear Overflow Flag)</h2>
          <div className='span-div'>
            <span>Művelet: 0 → V</span>
            <span className='inst-span'>Befolyásolt flagek: V</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 0-ra inicizalizálja a túlcsordulás flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>CLV</td>
              <td>$B8</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="sec" className='inst-div'>
          <h2>SEC - Carry flag bebillentése (Set Carry Flag)</h2>
          <div className='span-div'>
            <span>Művelet: 1 → C</span>
            <span className='inst-span'>Befolyásolt flagek: C</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 1-re inicizalizálja a carry flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>SEC</td>
              <td>$38</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="sed" className='inst-div'>
          <h2>SED - decimális flag bebillentése (Set Decimal Mode)</h2>
          <div className='span-div'>
            <span>Művelet: 1 → D</span>
            <span className='inst-span'>Befolyásolt flagek: D</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 1-re inicizalizálja a decimális flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>SED</td>
              <td>$F8</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="sei" className='inst-div'>
          <h2>SEI - Megszakítás kikapcsolása flag bebillentése (Set Interrupt Disable)</h2>
          <div className='span-div'>
            <span>Művelet: 1 → I</span>
            <span className='inst-span'>Befolyásolt flagek: I</span>
          </div>
          <p className='span-div'>
              Ez az utasítás 1-re inicizalizálja a megszakítás kikapcsolása flaget.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>SEI</td>
              <td>$78</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

        <div id="brk" className='inst-div'>
          <h2>BRK - Break utasítás (Break Command)</h2>
          <div className='span-div'>
            <span>Művelet: PC + 2↓, [FFFE] → PCL, [FFFF] → PCH</span>
            <span className='inst-span'>Befolyásolt flagek: I</span>
          </div>
          <p className='span-div'>
          A break utasítás hatására a mikroprocesszor a program vezérlése alatt egy megszakítási szekvencián 
          megy keresztül. Ez azt jelenti, hogy a BRK után a  programszámláló második bájtja automatikusan 
          a veremre kerül a processzor státuszával együtt a break utasítás elején. A mikroprocesszor ezután 
          átadja a vezérlést a megszakítási vektornak.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>BRK</td>
              <td>$00</td>
              <td>1</td>
              <td>7</td>
            </tr>
          </table>
        </div>

        <div id="jmp" className='inst-div'>
          <h2>JMP - Indirekt ugrás (JMP Indirect)</h2>
          <div className='span-div'>
            <span>Művelet: [PC + 1] → PCL, [PC + 2] → PCH</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          Az adott értékre állítja a programszámlálót.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>JMP $nnnn</td>
              <td>$4C</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Abszolút indirekt</td>
              <td>JMP ($nnnn)</td>
              <td>$6C</td>
              <td>3</td>
              <td>5</td>
            </tr>
          </table>
        </div>

        <div id="jsr" className='inst-div'>
          <h2>JSR - Szubrutinhoz ugrás (Jump To Subroutine)</h2>
          <div className='span-div'>
            <span>Művelet: PC + 2↓, [PC + 1] → PCL, [PC + 2] → PCH</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          Ez az utasítás a programszámlálót egy szubrutin pozíciójára irányítja, de a veremben hagy egy 
          visszatérési mutatót, hogy a felhasználó az szubrutin befejezése után visszatérhessen a főprogram 
          következő utasításának végrehajtásához. Ennek érdekében a JSR utasítás az ugrás utasítás utolsó 
          bájtjára mutató programszámláló címét a veremmutató segítségével a veremre tárolja. A verembájt 
          először a programszámláló magas, majd a programszámláló alacsony értékét tartalmazza. 
          A JSR ezután az ugrás utasítást követő címeket a programszámláló alacsony és a programszámláló 
          magas címére helyezi át, ezzel irányítva a programot, hogy az új címen kezdődjön.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Abszolút</td>
              <td>JSR $nnnn</td>
              <td>$20</td>
              <td>3</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="rti" className='inst-div'>
          <h2>RTI - Visszatérés megszakításból (Return From Interrupt)</h2>
          <div className='span-div'>
            <span>Művelet: P↑ PC↑</span>
            <span className='inst-span'>Befolyásolt flagek: N V D I Z C</span>
          </div>
          <p className='span-div'>
          Ez az utasítás a veremről a mikroprocesszorba továbbítja a processzor állapotát és a 
          megszakított utasítás programszámlálójának helyét. Az RTI utasítás újrainicializálja az összes 
          flaget arra a pozícióra, ahol a megszakítás idején voltak, és a programszámlálót 
          visszaállítja a megszakítás előtti állapotba.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>RTI</td>
              <td>$40</td>
              <td>1</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="rts" className='inst-div'>
          <h2>RTS - Visszatérés szubrutinból (Return From Subrutin)</h2>
          <div className='span-div'>
            <span>Művelet: PC↑, PC + 1 → PC</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          Ez az utasítás betölti a programszámláló alacsony és a programszámláló magas értékét a veremről a 
          programszámlálóba, és növeli a programszámlálót úgy, hogy az a JSR-t követő utasításra mutasson. 
          A veremmutatót kétszer inkrementálja.
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Implikált</td>
              <td>RTS</td>
              <td>$60</td>
              <td>1</td>
              <td>6</td>
            </tr>
          </table>
        </div>

        <div id="nop" className='inst-div'>
          <h2>NOP - Nincs művelet (No Operation)</h2>
          <div className='span-div'>
            <span>Művelet: nincs művelet</span>
            <span className='inst-span'>Befolyásolt flagek:</span>
          </div>
          <p className='span-div'>
          </p>
          <table>
            <tr className='table-head'>
              <th>Címzés módja</th>
              <th>Assembly szintaxis</th>
              <th>Opkód</th>
              <th>Bájtok száma</th>
              <th>Ciklusok száma</th>
            </tr>
            <tr>
              <td>Bennefoglalt</td>
              <td>NOP</td>
              <td>$EA</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Instructions