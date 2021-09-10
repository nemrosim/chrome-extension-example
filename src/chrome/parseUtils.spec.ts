import { parseIrbis, parseRgada } from './parseUtil';

describe('Irbis', () => {
    test('should parse one link', () => {
        const fileName = '00003358';

        document.body.innerHTML = `<p>
            <img width="24" src="/irbis_ir/images/full_text.png">
            <a href="/cgi-bin/irbis_ir/cgiirbis_64.exe?Z21ID=&amp;I21DBN=ELIB&amp;P21DBN=ELIB&amp;S21STN=1&amp;S21REF=10&amp;S21FMT=online_book&amp;C21COM=S&amp;S21CNR=20&amp;S21P01=0&amp;S21P02=0&amp;S21P03=FF=&amp;S21STR=${fileName}">ANY
                TEXT</a>
        </p>
        `;
        expect(parseIrbis()).toEqual(['http://irbis-nbuv.gov.ua/E_LIB/PDF/00003358.pdf']);
    });

    test('should parse multiple links', () => {
        const fileName1 = '00000053%5F01';
        const fileName2 = '00000053%5F02';

        document.body.innerHTML = `<p>
            <img src="/irbis_ir/images/full_text.png">
            <a href="/cgi-bin/irbis_ir/cgiirbis_64.exe?Z21ID=&amp;I21DBN=ELIB&amp;P21DBN=ELIB&amp;S21STN=1&amp;S21REF=10&amp;S21FMT=online_book&amp;C21COM=S&amp;S21CNR=20&amp;S21P01=0&amp;S21P02=0&amp;S21P03=FF=&amp;S21STR=${fileName1}">
            </a>
            <img src="/irbis_ir/images/full_text.png">
            <a href="/cgi-bin/irbis_ir/cgiirbis_64.exe?Z21ID=&amp;I21DBN=ELIB&amp;P21DBN=ELIB&amp;S21STN=1&amp;S21REF=10&amp;S21FMT=online_book&amp;C21COM=S&amp;S21CNR=20&amp;S21P01=0&amp;S21P02=0&amp;S21P03=FF=&amp;S21STR=${fileName2}">
            </a>
        </p>`;

        expect(parseIrbis()).toEqual([
            `http://irbis-nbuv.gov.ua/E_LIB/PDF/${fileName1}.pdf`,
            `http://irbis-nbuv.gov.ua/E_LIB/PDF/${fileName2}.pdf`,
        ]);
    });
});

describe('Rgada', () => {
    test('should parse "JPEG" links', () => {
        document.body.innerHTML = `
            <div class="es-carousel">
                <ul style="width: 12250px; display: block; margin-left: 0px;">
                    <li class="selected"><a><img
                            src="http://rgada.info/3/23/0.jpg" data-large="2/381_1_47/0001.jpg"
                            data-largeim="1/381_1_47/0001.zif" alt="image1"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/1.jpg" data-large="2/381_1_47/0002.jpg"
                            data-largeim="1/381_1_47/0002.zif" alt="image2"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/2.jpg" data-large="2/381_1_47/0003.jpg"
                            data-largeim="1/381_1_47/0003.zif" alt="image3"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/3.jpg" data-large="2/381_1_47/0004.jpg"
                            data-largeim="1/381_1_47/0004.zif" alt="image4"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/4.jpg" data-large="2/381_1_47/0005.jpg"
                            data-largeim="1/381_1_47/0005.zif" alt="image5"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/5.jpg" data-large="2/381_1_47/0006.jpg"
                            data-largeim="1/381_1_47/0006.zif" alt="image6"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/6.jpg" data-large="2/381_1_47/0007.jpg"
                            data-largeim="1/381_1_47/0007.zif" alt="image7"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/7.jpg" data-large="2/381_1_47/0008.jpg"
                            data-largeim="1/381_1_47/0008.zif" alt="image8"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/8.jpg" data-large="2/381_1_47/0009.jpg"
                            data-largeim="1/381_1_47/0009.zif" alt="image9"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/9.jpg" data-large="2/381_1_47/0010.jpg"
                            data-largeim="1/381_1_47/0010.zif" alt="image10"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/10.jpg" data-large="2/381_1_47/0011.jpg"
                            data-largeim="1/381_1_47/0011.zif" alt="image11"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/11.jpg" data-large="2/381_1_47/0012.jpg"
                            data-largeim="1/381_1_47/0012.zif" alt="image12"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/12.jpg" data-large="2/381_1_47/0013.jpg"
                            data-largeim="1/381_1_47/0013.zif" alt="image13"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/13.jpg" data-large="2/381_1_47/0014.jpg"
                            data-largeim="1/381_1_47/0014.zif" alt="image14"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/14.jpg" data-large="2/381_1_47/0015.jpg"
                            data-largeim="1/381_1_47/0015.zif" alt="image15"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/15.jpg" data-large="2/381_1_47/0016.jpg"
                            data-largeim="1/381_1_47/0016.zif" alt="image16"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/16.jpg" data-large="2/381_1_47/0017.jpg"
                            data-largeim="1/381_1_47/0017.zif" alt="image17"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/17.jpg" data-large="2/381_1_47/0018.jpg"
                            data-largeim="1/381_1_47/0018.zif" alt="image18"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/18.jpg" data-large="2/381_1_47/0019.jpg"
                            data-largeim="1/381_1_47/0019.zif" alt="image19"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/19.jpg" data-large="2/381_1_47/0020.jpg"
                            data-largeim="1/381_1_47/0020.zif" alt="image20"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/20.jpg" data-large="2/381_1_47/0021.jpg"
                            data-largeim="1/381_1_47/0021.zif" alt="image21"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/21.jpg" data-large="2/381_1_47/0022.jpg"
                            data-largeim="1/381_1_47/0022.zif" alt="image22"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/22.jpg" data-large="2/381_1_47/0023.jpg"
                            data-largeim="1/381_1_47/0023.zif" alt="image23"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/23.jpg" data-large="2/381_1_47/0024.jpg"
                            data-largeim="1/381_1_47/0024.zif" alt="image24"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/24.jpg" data-large="2/381_1_47/0025.jpg"
                            data-largeim="1/381_1_47/0025.zif" alt="image25"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/25.jpg" data-large="2/381_1_47/0026.jpg"
                            data-largeim="1/381_1_47/0026.zif" alt="image26"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/26.jpg" data-large="2/381_1_47/0027.jpg"
                            data-largeim="1/381_1_47/0027.zif" alt="image27"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/27.jpg" data-large="2/381_1_47/0028.jpg"
                            data-largeim="1/381_1_47/0028.zif" alt="image28"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/28.jpg" data-large="2/381_1_47/0029.jpg"
                            data-largeim="1/381_1_47/0029.zif" alt="image29"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/29.jpg" data-large="2/381_1_47/0030.jpg"
                            data-largeim="1/381_1_47/0030.zif" alt="image30"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/30.jpg" data-large="2/381_1_47/0031.jpg"
                            data-largeim="1/381_1_47/0031.zif" alt="image31"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/31.jpg" data-large="2/381_1_47/0032.jpg"
                            data-largeim="1/381_1_47/0032.zif" alt="image32"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/32.jpg" data-large="2/381_1_47/0033.jpg"
                            data-largeim="1/381_1_47/0033.zif" alt="image33"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/33.jpg" data-large="2/381_1_47/0034.jpg"
                            data-largeim="1/381_1_47/0034.zif" alt="image34"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/34.jpg" data-large="2/381_1_47/0035.jpg"
                            data-largeim="1/381_1_47/0035.zif" alt="image35"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/35.jpg" data-large="2/381_1_47/0036.jpg"
                            data-largeim="1/381_1_47/0036.zif" alt="image36"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/36.jpg" data-large="2/381_1_47/0037.jpg"
                            data-largeim="1/381_1_47/0037.zif" alt="image37"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/37.jpg" data-large="2/381_1_47/0038.jpg"
                            data-largeim="1/381_1_47/0038.zif" alt="image38"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/38.jpg" data-large="2/381_1_47/0039.jpg"
                            data-largeim="1/381_1_47/0039.zif" alt="image39"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/39.jpg" data-large="2/381_1_47/0040.jpg"
                            data-largeim="1/381_1_47/0040.zif" alt="image40"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/40.jpg" data-large="2/381_1_47/0041.jpg"
                            data-largeim="1/381_1_47/0041.zif" alt="image41"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/41.jpg" data-large="2/381_1_47/0042.jpg"
                            data-largeim="1/381_1_47/0042.zif" alt="image42"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/42.jpg" data-large="2/381_1_47/0043.jpg"
                            data-largeim="1/381_1_47/0043.zif" alt="image43"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/43.jpg" data-large="2/381_1_47/0044.jpg"
                            data-largeim="1/381_1_47/0044.zif" alt="image44"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/44.jpg" data-large="2/381_1_47/0045.jpg"
                            data-largeim="1/381_1_47/0045.zif" alt="image45"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/45.jpg" data-large="2/381_1_47/0046.jpg"
                            data-largeim="1/381_1_47/0046.zif" alt="image46"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/46.jpg" data-large="2/381_1_47/0047.jpg"
                            data-largeim="1/381_1_47/0047.zif" alt="image47"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/47.jpg" data-large="2/381_1_47/0048.jpg"
                            data-largeim="1/381_1_47/0048.zif" alt="image48"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/48.jpg" data-large="2/381_1_47/0049.jpg"
                            data-largeim="1/381_1_47/0049.zif" alt="image49"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/49.jpg" data-large="2/381_1_47/0050.jpg"
                            data-largeim="1/381_1_47/0050.zif" alt="image50"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/50.jpg" data-large="2/381_1_47/0051.jpg"
                            data-largeim="1/381_1_47/0051.zif" alt="image51"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/51.jpg" data-large="2/381_1_47/0052.jpg"
                            data-largeim="1/381_1_47/0052.zif" alt="image52"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/52.jpg" data-large="2/381_1_47/0053.jpg"
                            data-largeim="1/381_1_47/0053.zif" alt="image53"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/53.jpg" data-large="2/381_1_47/0054.jpg"
                            data-largeim="1/381_1_47/0054.zif" alt="image54"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/54.jpg" data-large="2/381_1_47/0055.jpg"
                            data-largeim="1/381_1_47/0055.zif" alt="image55"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/55.jpg" data-large="2/381_1_47/0056.jpg"
                            data-largeim="1/381_1_47/0056.zif" alt="image56"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/56.jpg" data-large="2/381_1_47/0057.jpg"
                            data-largeim="1/381_1_47/0057.zif" alt="image57"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/57.jpg" data-large="2/381_1_47/0058.jpg"
                            data-largeim="1/381_1_47/0058.zif" alt="image58"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/58.jpg" data-large="2/381_1_47/0059.jpg"
                            data-largeim="1/381_1_47/0059.zif" alt="image59"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/59.jpg" data-large="2/381_1_47/0060.jpg"
                            data-largeim="1/381_1_47/0060.zif" alt="image60"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/60.jpg" data-large="2/381_1_47/0061.jpg"
                            data-largeim="1/381_1_47/0061.zif" alt="image61"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/61.jpg" data-large="2/381_1_47/0062.jpg"
                            data-largeim="1/381_1_47/0062.zif" alt="image62"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/62.jpg" data-large="2/381_1_47/0063.jpg"
                            data-largeim="1/381_1_47/0063.zif" alt="image63"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/63.jpg" data-large="2/381_1_47/0064.jpg"
                            data-largeim="1/381_1_47/0064.zif" alt="image64"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/64.jpg" data-large="2/381_1_47/0065.jpg"
                            data-largeim="1/381_1_47/0065.zif" alt="image65"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/65.jpg" data-large="2/381_1_47/0066.jpg"
                            data-largeim="1/381_1_47/0066.zif" alt="image66"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/66.jpg" data-large="2/381_1_47/0067.jpg"
                            data-largeim="1/381_1_47/0067.zif" alt="image67"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/67.jpg" data-large="2/381_1_47/0068.jpg"
                            data-largeim="1/381_1_47/0068.zif" alt="image68"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/68.jpg" data-large="2/381_1_47/0069.jpg"
                            data-largeim="1/381_1_47/0069.zif" alt="image69"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/69.jpg" data-large="2/381_1_47/0070.jpg"
                            data-largeim="1/381_1_47/0070.zif" alt="image70"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/70.jpg" data-large="2/381_1_47/0071.jpg"
                            data-largeim="1/381_1_47/0071.zif" alt="image71"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/71.jpg" data-large="2/381_1_47/0072.jpg"
                            data-largeim="1/381_1_47/0072.zif" alt="image72"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/72.jpg" data-large="2/381_1_47/0073.jpg"
                            data-largeim="1/381_1_47/0073.zif" alt="image73"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/73.jpg" data-large="2/381_1_47/0074.jpg"
                            data-largeim="1/381_1_47/0074.zif" alt="image74"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/74.jpg" data-large="2/381_1_47/0075.jpg"
                            data-largeim="1/381_1_47/0075.zif" alt="image75"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/75.jpg" data-large="2/381_1_47/0076.jpg"
                            data-largeim="1/381_1_47/0076.zif" alt="image76"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/76.jpg" data-large="2/381_1_47/0077.jpg"
                            data-largeim="1/381_1_47/0077.zif" alt="image77"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/77.jpg" data-large="2/381_1_47/0078.jpg"
                            data-largeim="1/381_1_47/0078.zif" alt="image78"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/78.jpg" data-large="2/381_1_47/0079.jpg"
                            data-largeim="1/381_1_47/0079.zif" alt="image79"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/79.jpg" data-large="2/381_1_47/0080.jpg"
                            data-largeim="1/381_1_47/0080.zif" alt="image80"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/80.jpg" data-large="2/381_1_47/0081.jpg"
                            data-largeim="1/381_1_47/0081.zif" alt="image81"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/81.jpg" data-large="2/381_1_47/0082.jpg"
                            data-largeim="1/381_1_47/0082.zif" alt="image82"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/82.jpg" data-large="2/381_1_47/0083.jpg"
                            data-largeim="1/381_1_47/0083.zif" alt="image83"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/83.jpg" data-large="2/381_1_47/0084.jpg"
                            data-largeim="1/381_1_47/0084.zif" alt="image84"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/84.jpg" data-large="2/381_1_47/0085.jpg"
                            data-largeim="1/381_1_47/0085.zif" alt="image85"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/85.jpg" data-large="2/381_1_47/0086.jpg"
                            data-largeim="1/381_1_47/0086.zif" alt="image86"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/86.jpg" data-large="2/381_1_47/0087.jpg"
                            data-largeim="1/381_1_47/0087.zif" alt="image87"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/87.jpg" data-large="2/381_1_47/0088.jpg"
                            data-largeim="1/381_1_47/0088.zif" alt="image88"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/88.jpg" data-large="2/381_1_47/0089.jpg"
                            data-largeim="1/381_1_47/0089.zif" alt="image89"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/89.jpg" data-large="2/381_1_47/0090.jpg"
                            data-largeim="1/381_1_47/0090.zif" alt="image90"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/90.jpg" data-large="2/381_1_47/0091.jpg"
                            data-largeim="1/381_1_47/0091.zif" alt="image91"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/91.jpg" data-large="2/381_1_47/0092.jpg"
                            data-largeim="1/381_1_47/0092.zif" alt="image92"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/92.jpg" data-large="2/381_1_47/0093.jpg"
                            data-largeim="1/381_1_47/0093.zif" alt="image93"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/93.jpg" data-large="2/381_1_47/0094.jpg"
                            data-largeim="1/381_1_47/0094.zif" alt="image94"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/94.jpg" data-large="2/381_1_47/0095.jpg"
                            data-largeim="1/381_1_47/0095.zif" alt="image95"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/95.jpg" data-large="2/381_1_47/0096.jpg"
                            data-largeim="1/381_1_47/0096.zif" alt="image96"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/96.jpg" data-large="2/381_1_47/0097.jpg"
                            data-largeim="1/381_1_47/0097.zif" alt="image97"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/97.jpg" data-large="2/381_1_47/0098.jpg"
                            data-largeim="1/381_1_47/0098.zif" alt="image98"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/98.jpg" data-large="2/381_1_47/0099.jpg"
                            data-largeim="1/381_1_47/0099.zif" alt="image99"></a></li>
                    <li><a><img
                            src="../3/23/99.jpg" data-large="2/381_1_47/0100.jpg"
                            data-largeim="1/381_1_47/0100.zif" alt="image100"></a></li>
                    <li><a><img src="../3/23/100.jpg" data-large="2/381_1_47/0101.jpg"
                                data-largeim="1/381_1_47/0101.zif" alt="image101"></a></li>
                    <li><a><img src="../3/23/101.jpg" data-large="2/381_1_47/0102.jpg"
                                data-largeim="1/381_1_47/0102.zif"
                                alt="image102"></a></li>
                    <li><a><img
                            src="../3/23/102.jpg" data-large="2/381_1_47/0103.jpg" data-largeim="1/381_1_47/0103.zif"
                            alt="image103"></a></li>
                    <li><a><img
                            src="../3/23/103.jpg" data-large="2/381_1_47/0104.jpg" data-largeim="1/381_1_47/0104.zif"
                            alt="image104"></a></li>
                    <li><a><img
                            src="../3/23/104.jpg" data-large="2/381_1_47/0105.jpg" data-largeim="1/381_1_47/0105.zif"
                            alt="image105"></a></li>
                    <li><a><img
                            src="../3/23/105.jpg" data-large="2/381_1_47/0106.jpg" data-largeim="1/381_1_47/0106.zif"
                            alt="image106"></a></li>
                    <li><a><img
                            src="../3/23/106.jpg" data-large="2/381_1_47/0107.jpg" data-largeim="1/381_1_47/0107.zif"
                            alt="image107"></a></li>
                    <li><a><img
                            src="../3/23/107.jpg" data-large="2/381_1_47/0108.jpg" data-largeim="1/381_1_47/0108.zif"
                            alt="image108"></a></li>
                    <li><a><img
                            src="../3/23/108.jpg" data-large="2/381_1_47/0109.jpg" data-largeim="1/381_1_47/0109.zif"
                            alt="image109"></a></li>
                    <li><a><img
                            src="../3/23/109.jpg" data-large="2/381_1_47/0110.jpg" data-largeim="1/381_1_47/0110.zif"
                            alt="image110"></a></li>
                    <li><a><img
                            src="../3/23/110.jpg" data-large="2/381_1_47/0111.jpg" data-largeim="1/381_1_47/0111.zif"
                            alt="image111"></a></li>
                    <li><a><img
                            src="../3/23/111.jpg" data-large="2/381_1_47/0112.jpg" data-largeim="1/381_1_47/0112.zif"
                            alt="image112"></a></li>
                    <li><a><img
                            src="../3/23/112.jpg" data-large="2/381_1_47/0113.jpg" data-largeim="1/381_1_47/0113.zif"
                            alt="image113"></a></li>
                    <li><a><img
                            src="../3/23/113.jpg" data-large="2/381_1_47/0114.jpg" data-largeim="1/381_1_47/0114.zif"
                            alt="image114"></a></li>
                    <li><a><img
                            src="../3/23/114.jpg" data-large="2/381_1_47/0115.jpg" data-largeim="1/381_1_47/0115.zif"
                            alt="image115"></a></li>
                    <li><a><img
                            src="../3/23/115.jpg" data-large="2/381_1_47/0116.jpg" data-largeim="1/381_1_47/0116.zif"
                            alt="image116"></a></li>
                    <li><a><img
                            src="../3/23/116.jpg" data-large="2/381_1_47/0117.jpg" data-largeim="1/381_1_47/0117.zif"
                            alt="image117"></a></li>
                    <li><a><img
                            src="../3/23/117.jpg" data-large="2/381_1_47/0118.jpg" data-largeim="1/381_1_47/0118.zif"
                            alt="image118"></a></li>
                    <li><a><img
                            src="../3/23/118.jpg" data-large="2/381_1_47/0119.jpg" data-largeim="1/381_1_47/0119.zif"
                            alt="image119"></a></li>
                    <li><a><img
                            src="../3/23/119.jpg" data-large="2/381_1_47/0120.jpg" data-largeim="1/381_1_47/0120.zif"
                            alt="image120"></a></li>
                    <li><a><img
                            src="../3/23/120.jpg" data-large="2/381_1_47/0121.jpg" data-largeim="1/381_1_47/0121.zif"
                            alt="image121"></a></li>
                    <li><a><img
                            src="../3/23/121.jpg" data-large="2/381_1_47/0122.jpg" data-largeim="1/381_1_47/0122.zif"
                            alt="image122"></a></li>
                    <li><a><img
                            src="../3/23/122.jpg" data-large="2/381_1_47/0123.jpg" data-largeim="1/381_1_47/0123.zif"
                            alt="image123"></a></li>
                    <li><a><img
                            src="../3/23/123.jpg" data-large="2/381_1_47/0124.jpg" data-largeim="1/381_1_47/0124.zif"
                            alt="image124"></a></li>
                    <li><a><img
                            src="../3/23/124.jpg" data-large="2/381_1_47/0125.jpg" data-largeim="1/381_1_47/0125.zif"
                            alt="image125"></a></li>
                    <li><a><img
                            src="../3/23/125.jpg" data-large="2/381_1_47/0126.jpg" data-largeim="1/381_1_47/0126.zif"
                            alt="image126"></a></li>
                    <li><a><img
                            src="../3/23/126.jpg" data-large="2/381_1_47/0127.jpg" data-largeim="1/381_1_47/0127.zif"
                            alt="image127"></a></li>
                    <li><a><img
                            src="../3/23/127.jpg" data-large="2/381_1_47/0128.jpg" data-largeim="1/381_1_47/0128.zif"
                            alt="image128"></a></li>
                    <li><a><img
                            src="../3/23/128.jpg" data-large="2/381_1_47/0129.jpg" data-largeim="1/381_1_47/0129.zif"
                            alt="image129"></a></li>
                    <li><a><img
                            src="../3/23/129.jpg" data-large="2/381_1_47/0130.jpg" data-largeim="1/381_1_47/0130.zif"
                            alt="image130"></a></li>
                    <li><a><img
                            src="../3/23/130.jpg" data-large="2/381_1_47/0131.jpg" data-largeim="1/381_1_47/0131.zif"
                            alt="image131"></a></li>
                    <li><a><img
                            src="../3/23/131.jpg" data-large="2/381_1_47/0132.jpg" data-largeim="1/381_1_47/0132.zif"
                            alt="image132"></a></li>
                    <li><a><img
                            src="../3/23/132.jpg" data-large="2/381_1_47/0133.jpg" data-largeim="1/381_1_47/0133.zif"
                            alt="image133"></a></li>
                    <li><a><img
                            src="../3/23/133.jpg" data-large="2/381_1_47/0134.jpg" data-largeim="1/381_1_47/0134.zif"
                            alt="image134"></a></li>
                    <li><a><img
                            src="../3/23/134.jpg" data-large="2/381_1_47/0135.jpg" data-largeim="1/381_1_47/0135.zif"
                            alt="image135"></a></li>
                    <li><a><img
                            src="../3/23/135.jpg" data-large="2/381_1_47/0136.jpg" data-largeim="1/381_1_47/0136.zif"
                            alt="image136"></a></li>
                    <li><a><img
                            src="../3/23/136.jpg" data-large="2/381_1_47/0137.jpg" data-largeim="1/381_1_47/0137.zif"
                            alt="image137"></a></li>
                    <li><a><img
                            src="../3/23/137.jpg" data-large="2/381_1_47/0138.jpg" data-largeim="1/381_1_47/0138.zif"
                            alt="image138"></a></li>
                    <li><a><img
                            src="../3/23/138.jpg" data-large="2/381_1_47/0139.jpg" data-largeim="1/381_1_47/0139.zif"
                            alt="image139"></a></li>
                    <li><a><img
                            src="../3/23/139.jpg" data-large="2/381_1_47/0140.jpg" data-largeim="1/381_1_47/0140.zif"
                            alt="image140"></a></li>
                    <li><a><img
                            src="../3/23/140.jpg" data-large="2/381_1_47/0141.jpg" data-largeim="1/381_1_47/0141.zif"
                            alt="image141"></a></li>
                    <li><a><img
                            src="../3/23/141.jpg" data-large="2/381_1_47/0142.jpg" data-largeim="1/381_1_47/0142.zif"
                            alt="image142"></a></li>
                    <li><a><img
                            src="../3/23/142.jpg" data-large="2/381_1_47/0143.jpg" data-largeim="1/381_1_47/0143.zif"
                            alt="image143"></a></li>
                    <li><a><img
                            src="../3/23/143.jpg" data-large="2/381_1_47/0144.jpg" data-largeim="1/381_1_47/0144.zif"
                            alt="image144"></a></li>
                    <li><a><img
                            src="../3/23/144.jpg" data-large="2/381_1_47/0145.jpg" data-largeim="1/381_1_47/0145.zif"
                            alt="image145"></a></li>
                    <li><a><img
                            src="../3/23/145.jpg" data-large="2/381_1_47/0146.jpg" data-largeim="1/381_1_47/0146.zif"
                            alt="image146"></a></li>
                    <li><a><img
                            src="../3/23/146.jpg" data-large="2/381_1_47/0147.jpg" data-largeim="1/381_1_47/0147.zif"
                            alt="image147"></a></li>
                    <li><a><img
                            src="../3/23/147.jpg" data-large="2/381_1_47/0148.jpg" data-largeim="1/381_1_47/0148.zif"
                            alt="image148"></a></li>
                    <li><a><img
                            src="../3/23/148.jpg" data-large="2/381_1_47/0149.jpg" data-largeim="1/381_1_47/0149.zif"
                            alt="image149"></a></li>
                    <li><a><img
                            src="../3/23/149.jpg" data-large="2/381_1_47/0150.jpg" data-largeim="1/381_1_47/0150.zif"
                            alt="image150"></a></li>
                    <li><a><img
                            src="../3/23/150.jpg" data-large="2/381_1_47/0151.jpg" data-largeim="1/381_1_47/0151.zif"
                            alt="image151"></a></li>
                    <li><a><img
                            src="../3/23/151.jpg" data-large="2/381_1_47/0152.jpg" data-largeim="1/381_1_47/0152.zif"
                            alt="image152"></a></li>
                    <li><a><img
                            src="../3/23/152.jpg" data-large="2/381_1_47/0153.jpg" data-largeim="1/381_1_47/0153.zif"
                            alt="image153"></a></li>
                    <li><a><img
                            src="../3/23/153.jpg" data-large="2/381_1_47/0154.jpg" data-largeim="1/381_1_47/0154.zif"
                            alt="image154"></a></li>
                    <li><a><img
                            src="../3/23/154.jpg" data-large="2/381_1_47/0155.jpg" data-largeim="1/381_1_47/0155.zif"
                            alt="image155"></a></li>
                    <li><a><img
                            src="../3/23/155.jpg" data-large="2/381_1_47/0156.jpg" data-largeim="1/381_1_47/0156.zif"
                            alt="image156"></a></li>
                    <li><a><img
                            src="../3/23/156.jpg" data-large="2/381_1_47/0157.jpg" data-largeim="1/381_1_47/0157.zif"
                            alt="image157"></a></li>
                    <li><a><img
                            src="../3/23/157.jpg" data-large="2/381_1_47/0158.jpg" data-largeim="1/381_1_47/0158.zif"
                            alt="image158"></a></li>
                    <li><a><img
                            src="../3/23/158.jpg" data-large="2/381_1_47/0159.jpg" data-largeim="1/381_1_47/0159.zif"
                            alt="image159"></a></li>
                    <li><a><img
                            src="../3/23/159.jpg" data-large="2/381_1_47/0160.jpg" data-largeim="1/381_1_47/0160.zif"
                            alt="image160"></a></li>
                    <li><a><img
                            src="../3/23/160.jpg" data-large="2/381_1_47/0161.jpg" data-largeim="1/381_1_47/0161.zif"
                            alt="image161"></a></li>
                    <li><a><img
                            src="../3/23/161.jpg" data-large="2/381_1_47/0162.jpg" data-largeim="1/381_1_47/0162.zif"
                            alt="image162"></a></li>
                    <li><a><img
                            src="../3/23/162.jpg" data-large="2/381_1_47/0163.jpg" data-largeim="1/381_1_47/0163.zif"
                            alt="image163"></a></li>
                    <li><a><img
                            src="../3/23/163.jpg" data-large="2/381_1_47/0164.jpg" data-largeim="1/381_1_47/0164.zif"
                            alt="image164"></a></li>
                    <li><a><img
                            src="../3/23/164.jpg" data-large="2/381_1_47/0165.jpg" data-largeim="1/381_1_47/0165.zif"
                            alt="image165"></a></li>
                    <li><a><img
                            src="../3/23/165.jpg" data-large="2/381_1_47/0166.jpg" data-largeim="1/381_1_47/0166.zif"
                            alt="image166"></a></li>
                    <li><a><img
                            src="../3/23/166.jpg" data-large="2/381_1_47/0167.jpg" data-largeim="1/381_1_47/0167.zif"
                            alt="image167"></a></li>
                    <li><a><img
                            src="../3/23/167.jpg" data-large="2/381_1_47/0168.jpg" data-largeim="1/381_1_47/0168.zif"
                            alt="image168"></a></li>
                    <li><a><img
                            src="../3/23/168.jpg" data-large="2/381_1_47/0169.jpg" data-largeim="1/381_1_47/0169.zif"
                            alt="image169"></a></li>
                    <li><a><img
                            src="../3/23/169.jpg" data-large="2/381_1_47/0170.jpg" data-largeim="1/381_1_47/0170.zif"
                            alt="image170"></a></li>
                </ul>
            </div>
        `;
        const result = parseRgada('jpeg');
        expect(result).toEqual([
            'http://rgada.info/kueh/2/381_1_47/0001.jpg',
            'http://rgada.info/kueh/2/381_1_47/0002.jpg',
            'http://rgada.info/kueh/2/381_1_47/0003.jpg',
            'http://rgada.info/kueh/2/381_1_47/0004.jpg',
            'http://rgada.info/kueh/2/381_1_47/0005.jpg',
            'http://rgada.info/kueh/2/381_1_47/0006.jpg',
            'http://rgada.info/kueh/2/381_1_47/0007.jpg',
            'http://rgada.info/kueh/2/381_1_47/0008.jpg',
            'http://rgada.info/kueh/2/381_1_47/0009.jpg',
            'http://rgada.info/kueh/2/381_1_47/0010.jpg',
            'http://rgada.info/kueh/2/381_1_47/0011.jpg',
            'http://rgada.info/kueh/2/381_1_47/0012.jpg',
            'http://rgada.info/kueh/2/381_1_47/0013.jpg',
            'http://rgada.info/kueh/2/381_1_47/0014.jpg',
            'http://rgada.info/kueh/2/381_1_47/0015.jpg',
            'http://rgada.info/kueh/2/381_1_47/0016.jpg',
            'http://rgada.info/kueh/2/381_1_47/0017.jpg',
            'http://rgada.info/kueh/2/381_1_47/0018.jpg',
            'http://rgada.info/kueh/2/381_1_47/0019.jpg',
            'http://rgada.info/kueh/2/381_1_47/0020.jpg',
            'http://rgada.info/kueh/2/381_1_47/0021.jpg',
            'http://rgada.info/kueh/2/381_1_47/0022.jpg',
            'http://rgada.info/kueh/2/381_1_47/0023.jpg',
            'http://rgada.info/kueh/2/381_1_47/0024.jpg',
            'http://rgada.info/kueh/2/381_1_47/0025.jpg',
            'http://rgada.info/kueh/2/381_1_47/0026.jpg',
            'http://rgada.info/kueh/2/381_1_47/0027.jpg',
            'http://rgada.info/kueh/2/381_1_47/0028.jpg',
            'http://rgada.info/kueh/2/381_1_47/0029.jpg',
            'http://rgada.info/kueh/2/381_1_47/0030.jpg',
            'http://rgada.info/kueh/2/381_1_47/0031.jpg',
            'http://rgada.info/kueh/2/381_1_47/0032.jpg',
            'http://rgada.info/kueh/2/381_1_47/0033.jpg',
            'http://rgada.info/kueh/2/381_1_47/0034.jpg',
            'http://rgada.info/kueh/2/381_1_47/0035.jpg',
            'http://rgada.info/kueh/2/381_1_47/0036.jpg',
            'http://rgada.info/kueh/2/381_1_47/0037.jpg',
            'http://rgada.info/kueh/2/381_1_47/0038.jpg',
            'http://rgada.info/kueh/2/381_1_47/0039.jpg',
            'http://rgada.info/kueh/2/381_1_47/0040.jpg',
            'http://rgada.info/kueh/2/381_1_47/0041.jpg',
            'http://rgada.info/kueh/2/381_1_47/0042.jpg',
            'http://rgada.info/kueh/2/381_1_47/0043.jpg',
            'http://rgada.info/kueh/2/381_1_47/0044.jpg',
            'http://rgada.info/kueh/2/381_1_47/0045.jpg',
            'http://rgada.info/kueh/2/381_1_47/0046.jpg',
            'http://rgada.info/kueh/2/381_1_47/0047.jpg',
            'http://rgada.info/kueh/2/381_1_47/0048.jpg',
            'http://rgada.info/kueh/2/381_1_47/0049.jpg',
            'http://rgada.info/kueh/2/381_1_47/0050.jpg',
            'http://rgada.info/kueh/2/381_1_47/0051.jpg',
            'http://rgada.info/kueh/2/381_1_47/0052.jpg',
            'http://rgada.info/kueh/2/381_1_47/0053.jpg',
            'http://rgada.info/kueh/2/381_1_47/0054.jpg',
            'http://rgada.info/kueh/2/381_1_47/0055.jpg',
            'http://rgada.info/kueh/2/381_1_47/0056.jpg',
            'http://rgada.info/kueh/2/381_1_47/0057.jpg',
            'http://rgada.info/kueh/2/381_1_47/0058.jpg',
            'http://rgada.info/kueh/2/381_1_47/0059.jpg',
            'http://rgada.info/kueh/2/381_1_47/0060.jpg',
            'http://rgada.info/kueh/2/381_1_47/0061.jpg',
            'http://rgada.info/kueh/2/381_1_47/0062.jpg',
            'http://rgada.info/kueh/2/381_1_47/0063.jpg',
            'http://rgada.info/kueh/2/381_1_47/0064.jpg',
            'http://rgada.info/kueh/2/381_1_47/0065.jpg',
            'http://rgada.info/kueh/2/381_1_47/0066.jpg',
            'http://rgada.info/kueh/2/381_1_47/0067.jpg',
            'http://rgada.info/kueh/2/381_1_47/0068.jpg',
            'http://rgada.info/kueh/2/381_1_47/0069.jpg',
            'http://rgada.info/kueh/2/381_1_47/0070.jpg',
            'http://rgada.info/kueh/2/381_1_47/0071.jpg',
            'http://rgada.info/kueh/2/381_1_47/0072.jpg',
            'http://rgada.info/kueh/2/381_1_47/0073.jpg',
            'http://rgada.info/kueh/2/381_1_47/0074.jpg',
            'http://rgada.info/kueh/2/381_1_47/0075.jpg',
            'http://rgada.info/kueh/2/381_1_47/0076.jpg',
            'http://rgada.info/kueh/2/381_1_47/0077.jpg',
            'http://rgada.info/kueh/2/381_1_47/0078.jpg',
            'http://rgada.info/kueh/2/381_1_47/0079.jpg',
            'http://rgada.info/kueh/2/381_1_47/0080.jpg',
            'http://rgada.info/kueh/2/381_1_47/0081.jpg',
            'http://rgada.info/kueh/2/381_1_47/0082.jpg',
            'http://rgada.info/kueh/2/381_1_47/0083.jpg',
            'http://rgada.info/kueh/2/381_1_47/0084.jpg',
            'http://rgada.info/kueh/2/381_1_47/0085.jpg',
            'http://rgada.info/kueh/2/381_1_47/0086.jpg',
            'http://rgada.info/kueh/2/381_1_47/0087.jpg',
            'http://rgada.info/kueh/2/381_1_47/0088.jpg',
            'http://rgada.info/kueh/2/381_1_47/0089.jpg',
            'http://rgada.info/kueh/2/381_1_47/0090.jpg',
            'http://rgada.info/kueh/2/381_1_47/0091.jpg',
            'http://rgada.info/kueh/2/381_1_47/0092.jpg',
            'http://rgada.info/kueh/2/381_1_47/0093.jpg',
            'http://rgada.info/kueh/2/381_1_47/0094.jpg',
            'http://rgada.info/kueh/2/381_1_47/0095.jpg',
            'http://rgada.info/kueh/2/381_1_47/0096.jpg',
            'http://rgada.info/kueh/2/381_1_47/0097.jpg',
            'http://rgada.info/kueh/2/381_1_47/0098.jpg',
            'http://rgada.info/kueh/2/381_1_47/0099.jpg',
            'http://rgada.info/kueh/2/381_1_47/0100.jpg',
            'http://rgada.info/kueh/2/381_1_47/0101.jpg',
            'http://rgada.info/kueh/2/381_1_47/0102.jpg',
            'http://rgada.info/kueh/2/381_1_47/0103.jpg',
            'http://rgada.info/kueh/2/381_1_47/0104.jpg',
            'http://rgada.info/kueh/2/381_1_47/0105.jpg',
            'http://rgada.info/kueh/2/381_1_47/0106.jpg',
            'http://rgada.info/kueh/2/381_1_47/0107.jpg',
            'http://rgada.info/kueh/2/381_1_47/0108.jpg',
            'http://rgada.info/kueh/2/381_1_47/0109.jpg',
            'http://rgada.info/kueh/2/381_1_47/0110.jpg',
            'http://rgada.info/kueh/2/381_1_47/0111.jpg',
            'http://rgada.info/kueh/2/381_1_47/0112.jpg',
            'http://rgada.info/kueh/2/381_1_47/0113.jpg',
            'http://rgada.info/kueh/2/381_1_47/0114.jpg',
            'http://rgada.info/kueh/2/381_1_47/0115.jpg',
            'http://rgada.info/kueh/2/381_1_47/0116.jpg',
            'http://rgada.info/kueh/2/381_1_47/0117.jpg',
            'http://rgada.info/kueh/2/381_1_47/0118.jpg',
            'http://rgada.info/kueh/2/381_1_47/0119.jpg',
            'http://rgada.info/kueh/2/381_1_47/0120.jpg',
            'http://rgada.info/kueh/2/381_1_47/0121.jpg',
            'http://rgada.info/kueh/2/381_1_47/0122.jpg',
            'http://rgada.info/kueh/2/381_1_47/0123.jpg',
            'http://rgada.info/kueh/2/381_1_47/0124.jpg',
            'http://rgada.info/kueh/2/381_1_47/0125.jpg',
            'http://rgada.info/kueh/2/381_1_47/0126.jpg',
            'http://rgada.info/kueh/2/381_1_47/0127.jpg',
            'http://rgada.info/kueh/2/381_1_47/0128.jpg',
            'http://rgada.info/kueh/2/381_1_47/0129.jpg',
            'http://rgada.info/kueh/2/381_1_47/0130.jpg',
            'http://rgada.info/kueh/2/381_1_47/0131.jpg',
            'http://rgada.info/kueh/2/381_1_47/0132.jpg',
            'http://rgada.info/kueh/2/381_1_47/0133.jpg',
            'http://rgada.info/kueh/2/381_1_47/0134.jpg',
            'http://rgada.info/kueh/2/381_1_47/0135.jpg',
            'http://rgada.info/kueh/2/381_1_47/0136.jpg',
            'http://rgada.info/kueh/2/381_1_47/0137.jpg',
            'http://rgada.info/kueh/2/381_1_47/0138.jpg',
            'http://rgada.info/kueh/2/381_1_47/0139.jpg',
            'http://rgada.info/kueh/2/381_1_47/0140.jpg',
            'http://rgada.info/kueh/2/381_1_47/0141.jpg',
            'http://rgada.info/kueh/2/381_1_47/0142.jpg',
            'http://rgada.info/kueh/2/381_1_47/0143.jpg',
            'http://rgada.info/kueh/2/381_1_47/0144.jpg',
            'http://rgada.info/kueh/2/381_1_47/0145.jpg',
            'http://rgada.info/kueh/2/381_1_47/0146.jpg',
            'http://rgada.info/kueh/2/381_1_47/0147.jpg',
            'http://rgada.info/kueh/2/381_1_47/0148.jpg',
            'http://rgada.info/kueh/2/381_1_47/0149.jpg',
            'http://rgada.info/kueh/2/381_1_47/0150.jpg',
            'http://rgada.info/kueh/2/381_1_47/0151.jpg',
            'http://rgada.info/kueh/2/381_1_47/0152.jpg',
            'http://rgada.info/kueh/2/381_1_47/0153.jpg',
            'http://rgada.info/kueh/2/381_1_47/0154.jpg',
            'http://rgada.info/kueh/2/381_1_47/0155.jpg',
            'http://rgada.info/kueh/2/381_1_47/0156.jpg',
            'http://rgada.info/kueh/2/381_1_47/0157.jpg',
            'http://rgada.info/kueh/2/381_1_47/0158.jpg',
            'http://rgada.info/kueh/2/381_1_47/0159.jpg',
            'http://rgada.info/kueh/2/381_1_47/0160.jpg',
            'http://rgada.info/kueh/2/381_1_47/0161.jpg',
            'http://rgada.info/kueh/2/381_1_47/0162.jpg',
            'http://rgada.info/kueh/2/381_1_47/0163.jpg',
            'http://rgada.info/kueh/2/381_1_47/0164.jpg',
            'http://rgada.info/kueh/2/381_1_47/0165.jpg',
            'http://rgada.info/kueh/2/381_1_47/0166.jpg',
            'http://rgada.info/kueh/2/381_1_47/0167.jpg',
            'http://rgada.info/kueh/2/381_1_47/0168.jpg',
            'http://rgada.info/kueh/2/381_1_47/0169.jpg',
            'http://rgada.info/kueh/2/381_1_47/0170.jpg',
        ]);
    });

    test('should parse "ZIF" links', () => {
        document.body.innerHTML = `
            <div class="es-carousel">
                <ul style="width: 12250px; display: block; margin-left: 0px;">
                    <li class="selected"><a><img
                            src="http://rgada.info/3/23/0.jpg" data-large="2/381_1_47/0001.jpg"
                            data-largeim="1/381_1_47/0001.zif" alt="image1"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/1.jpg" data-large="2/381_1_47/0002.jpg"
                            data-largeim="1/381_1_47/0002.zif" alt="image2"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/2.jpg" data-large="2/381_1_47/0003.jpg"
                            data-largeim="1/381_1_47/0003.zif" alt="image3"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/3.jpg" data-large="2/381_1_47/0004.jpg"
                            data-largeim="1/381_1_47/0004.zif" alt="image4"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/4.jpg" data-large="2/381_1_47/0005.jpg"
                            data-largeim="1/381_1_47/0005.zif" alt="image5"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/5.jpg" data-large="2/381_1_47/0006.jpg"
                            data-largeim="1/381_1_47/0006.zif" alt="image6"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/6.jpg" data-large="2/381_1_47/0007.jpg"
                            data-largeim="1/381_1_47/0007.zif" alt="image7"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/7.jpg" data-large="2/381_1_47/0008.jpg"
                            data-largeim="1/381_1_47/0008.zif" alt="image8"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/8.jpg" data-large="2/381_1_47/0009.jpg"
                            data-largeim="1/381_1_47/0009.zif" alt="image9"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/9.jpg" data-large="2/381_1_47/0010.jpg"
                            data-largeim="1/381_1_47/0010.zif" alt="image10"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/10.jpg" data-large="2/381_1_47/0011.jpg"
                            data-largeim="1/381_1_47/0011.zif" alt="image11"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/11.jpg" data-large="2/381_1_47/0012.jpg"
                            data-largeim="1/381_1_47/0012.zif" alt="image12"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/12.jpg" data-large="2/381_1_47/0013.jpg"
                            data-largeim="1/381_1_47/0013.zif" alt="image13"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/13.jpg" data-large="2/381_1_47/0014.jpg"
                            data-largeim="1/381_1_47/0014.zif" alt="image14"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/14.jpg" data-large="2/381_1_47/0015.jpg"
                            data-largeim="1/381_1_47/0015.zif" alt="image15"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/15.jpg" data-large="2/381_1_47/0016.jpg"
                            data-largeim="1/381_1_47/0016.zif" alt="image16"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/16.jpg" data-large="2/381_1_47/0017.jpg"
                            data-largeim="1/381_1_47/0017.zif" alt="image17"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/17.jpg" data-large="2/381_1_47/0018.jpg"
                            data-largeim="1/381_1_47/0018.zif" alt="image18"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/18.jpg" data-large="2/381_1_47/0019.jpg"
                            data-largeim="1/381_1_47/0019.zif" alt="image19"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/19.jpg" data-large="2/381_1_47/0020.jpg"
                            data-largeim="1/381_1_47/0020.zif" alt="image20"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/20.jpg" data-large="2/381_1_47/0021.jpg"
                            data-largeim="1/381_1_47/0021.zif" alt="image21"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/21.jpg" data-large="2/381_1_47/0022.jpg"
                            data-largeim="1/381_1_47/0022.zif" alt="image22"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/22.jpg" data-large="2/381_1_47/0023.jpg"
                            data-largeim="1/381_1_47/0023.zif" alt="image23"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/23.jpg" data-large="2/381_1_47/0024.jpg"
                            data-largeim="1/381_1_47/0024.zif" alt="image24"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/24.jpg" data-large="2/381_1_47/0025.jpg"
                            data-largeim="1/381_1_47/0025.zif" alt="image25"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/25.jpg" data-large="2/381_1_47/0026.jpg"
                            data-largeim="1/381_1_47/0026.zif" alt="image26"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/26.jpg" data-large="2/381_1_47/0027.jpg"
                            data-largeim="1/381_1_47/0027.zif" alt="image27"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/27.jpg" data-large="2/381_1_47/0028.jpg"
                            data-largeim="1/381_1_47/0028.zif" alt="image28"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/28.jpg" data-large="2/381_1_47/0029.jpg"
                            data-largeim="1/381_1_47/0029.zif" alt="image29"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/29.jpg" data-large="2/381_1_47/0030.jpg"
                            data-largeim="1/381_1_47/0030.zif" alt="image30"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/30.jpg" data-large="2/381_1_47/0031.jpg"
                            data-largeim="1/381_1_47/0031.zif" alt="image31"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/31.jpg" data-large="2/381_1_47/0032.jpg"
                            data-largeim="1/381_1_47/0032.zif" alt="image32"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/32.jpg" data-large="2/381_1_47/0033.jpg"
                            data-largeim="1/381_1_47/0033.zif" alt="image33"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/33.jpg" data-large="2/381_1_47/0034.jpg"
                            data-largeim="1/381_1_47/0034.zif" alt="image34"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/34.jpg" data-large="2/381_1_47/0035.jpg"
                            data-largeim="1/381_1_47/0035.zif" alt="image35"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/35.jpg" data-large="2/381_1_47/0036.jpg"
                            data-largeim="1/381_1_47/0036.zif" alt="image36"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/36.jpg" data-large="2/381_1_47/0037.jpg"
                            data-largeim="1/381_1_47/0037.zif" alt="image37"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/37.jpg" data-large="2/381_1_47/0038.jpg"
                            data-largeim="1/381_1_47/0038.zif" alt="image38"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/38.jpg" data-large="2/381_1_47/0039.jpg"
                            data-largeim="1/381_1_47/0039.zif" alt="image39"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/39.jpg" data-large="2/381_1_47/0040.jpg"
                            data-largeim="1/381_1_47/0040.zif" alt="image40"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/40.jpg" data-large="2/381_1_47/0041.jpg"
                            data-largeim="1/381_1_47/0041.zif" alt="image41"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/41.jpg" data-large="2/381_1_47/0042.jpg"
                            data-largeim="1/381_1_47/0042.zif" alt="image42"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/42.jpg" data-large="2/381_1_47/0043.jpg"
                            data-largeim="1/381_1_47/0043.zif" alt="image43"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/43.jpg" data-large="2/381_1_47/0044.jpg"
                            data-largeim="1/381_1_47/0044.zif" alt="image44"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/44.jpg" data-large="2/381_1_47/0045.jpg"
                            data-largeim="1/381_1_47/0045.zif" alt="image45"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/45.jpg" data-large="2/381_1_47/0046.jpg"
                            data-largeim="1/381_1_47/0046.zif" alt="image46"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/46.jpg" data-large="2/381_1_47/0047.jpg"
                            data-largeim="1/381_1_47/0047.zif" alt="image47"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/47.jpg" data-large="2/381_1_47/0048.jpg"
                            data-largeim="1/381_1_47/0048.zif" alt="image48"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/48.jpg" data-large="2/381_1_47/0049.jpg"
                            data-largeim="1/381_1_47/0049.zif" alt="image49"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/49.jpg" data-large="2/381_1_47/0050.jpg"
                            data-largeim="1/381_1_47/0050.zif" alt="image50"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/50.jpg" data-large="2/381_1_47/0051.jpg"
                            data-largeim="1/381_1_47/0051.zif" alt="image51"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/51.jpg" data-large="2/381_1_47/0052.jpg"
                            data-largeim="1/381_1_47/0052.zif" alt="image52"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/52.jpg" data-large="2/381_1_47/0053.jpg"
                            data-largeim="1/381_1_47/0053.zif" alt="image53"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/53.jpg" data-large="2/381_1_47/0054.jpg"
                            data-largeim="1/381_1_47/0054.zif" alt="image54"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/54.jpg" data-large="2/381_1_47/0055.jpg"
                            data-largeim="1/381_1_47/0055.zif" alt="image55"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/55.jpg" data-large="2/381_1_47/0056.jpg"
                            data-largeim="1/381_1_47/0056.zif" alt="image56"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/56.jpg" data-large="2/381_1_47/0057.jpg"
                            data-largeim="1/381_1_47/0057.zif" alt="image57"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/57.jpg" data-large="2/381_1_47/0058.jpg"
                            data-largeim="1/381_1_47/0058.zif" alt="image58"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/58.jpg" data-large="2/381_1_47/0059.jpg"
                            data-largeim="1/381_1_47/0059.zif" alt="image59"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/59.jpg" data-large="2/381_1_47/0060.jpg"
                            data-largeim="1/381_1_47/0060.zif" alt="image60"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/60.jpg" data-large="2/381_1_47/0061.jpg"
                            data-largeim="1/381_1_47/0061.zif" alt="image61"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/61.jpg" data-large="2/381_1_47/0062.jpg"
                            data-largeim="1/381_1_47/0062.zif" alt="image62"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/62.jpg" data-large="2/381_1_47/0063.jpg"
                            data-largeim="1/381_1_47/0063.zif" alt="image63"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/63.jpg" data-large="2/381_1_47/0064.jpg"
                            data-largeim="1/381_1_47/0064.zif" alt="image64"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/64.jpg" data-large="2/381_1_47/0065.jpg"
                            data-largeim="1/381_1_47/0065.zif" alt="image65"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/65.jpg" data-large="2/381_1_47/0066.jpg"
                            data-largeim="1/381_1_47/0066.zif" alt="image66"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/66.jpg" data-large="2/381_1_47/0067.jpg"
                            data-largeim="1/381_1_47/0067.zif" alt="image67"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/67.jpg" data-large="2/381_1_47/0068.jpg"
                            data-largeim="1/381_1_47/0068.zif" alt="image68"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/68.jpg" data-large="2/381_1_47/0069.jpg"
                            data-largeim="1/381_1_47/0069.zif" alt="image69"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/69.jpg" data-large="2/381_1_47/0070.jpg"
                            data-largeim="1/381_1_47/0070.zif" alt="image70"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/70.jpg" data-large="2/381_1_47/0071.jpg"
                            data-largeim="1/381_1_47/0071.zif" alt="image71"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/71.jpg" data-large="2/381_1_47/0072.jpg"
                            data-largeim="1/381_1_47/0072.zif" alt="image72"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/72.jpg" data-large="2/381_1_47/0073.jpg"
                            data-largeim="1/381_1_47/0073.zif" alt="image73"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/73.jpg" data-large="2/381_1_47/0074.jpg"
                            data-largeim="1/381_1_47/0074.zif" alt="image74"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/74.jpg" data-large="2/381_1_47/0075.jpg"
                            data-largeim="1/381_1_47/0075.zif" alt="image75"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/75.jpg" data-large="2/381_1_47/0076.jpg"
                            data-largeim="1/381_1_47/0076.zif" alt="image76"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/76.jpg" data-large="2/381_1_47/0077.jpg"
                            data-largeim="1/381_1_47/0077.zif" alt="image77"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/77.jpg" data-large="2/381_1_47/0078.jpg"
                            data-largeim="1/381_1_47/0078.zif" alt="image78"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/78.jpg" data-large="2/381_1_47/0079.jpg"
                            data-largeim="1/381_1_47/0079.zif" alt="image79"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/79.jpg" data-large="2/381_1_47/0080.jpg"
                            data-largeim="1/381_1_47/0080.zif" alt="image80"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/80.jpg" data-large="2/381_1_47/0081.jpg"
                            data-largeim="1/381_1_47/0081.zif" alt="image81"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/81.jpg" data-large="2/381_1_47/0082.jpg"
                            data-largeim="1/381_1_47/0082.zif" alt="image82"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/82.jpg" data-large="2/381_1_47/0083.jpg"
                            data-largeim="1/381_1_47/0083.zif" alt="image83"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/83.jpg" data-large="2/381_1_47/0084.jpg"
                            data-largeim="1/381_1_47/0084.zif" alt="image84"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/84.jpg" data-large="2/381_1_47/0085.jpg"
                            data-largeim="1/381_1_47/0085.zif" alt="image85"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/85.jpg" data-large="2/381_1_47/0086.jpg"
                            data-largeim="1/381_1_47/0086.zif" alt="image86"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/86.jpg" data-large="2/381_1_47/0087.jpg"
                            data-largeim="1/381_1_47/0087.zif" alt="image87"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/87.jpg" data-large="2/381_1_47/0088.jpg"
                            data-largeim="1/381_1_47/0088.zif" alt="image88"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/88.jpg" data-large="2/381_1_47/0089.jpg"
                            data-largeim="1/381_1_47/0089.zif" alt="image89"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/89.jpg" data-large="2/381_1_47/0090.jpg"
                            data-largeim="1/381_1_47/0090.zif" alt="image90"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/90.jpg" data-large="2/381_1_47/0091.jpg"
                            data-largeim="1/381_1_47/0091.zif" alt="image91"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/91.jpg" data-large="2/381_1_47/0092.jpg"
                            data-largeim="1/381_1_47/0092.zif" alt="image92"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/92.jpg" data-large="2/381_1_47/0093.jpg"
                            data-largeim="1/381_1_47/0093.zif" alt="image93"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/93.jpg" data-large="2/381_1_47/0094.jpg"
                            data-largeim="1/381_1_47/0094.zif" alt="image94"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/94.jpg" data-large="2/381_1_47/0095.jpg"
                            data-largeim="1/381_1_47/0095.zif" alt="image95"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/95.jpg" data-large="2/381_1_47/0096.jpg"
                            data-largeim="1/381_1_47/0096.zif" alt="image96"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/96.jpg" data-large="2/381_1_47/0097.jpg"
                            data-largeim="1/381_1_47/0097.zif" alt="image97"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/97.jpg" data-large="2/381_1_47/0098.jpg"
                            data-largeim="1/381_1_47/0098.zif" alt="image98"></a></li>
                    <li><a><img
                            src="http://rgada.info/3/23/98.jpg" data-large="2/381_1_47/0099.jpg"
                            data-largeim="1/381_1_47/0099.zif" alt="image99"></a></li>
                    <li><a><img
                            src="../3/23/99.jpg" data-large="2/381_1_47/0100.jpg"
                            data-largeim="1/381_1_47/0100.zif" alt="image100"></a></li>
                    <li><a><img src="../3/23/100.jpg" data-large="2/381_1_47/0101.jpg"
                                data-largeim="1/381_1_47/0101.zif" alt="image101"></a></li>
                    <li><a><img src="../3/23/101.jpg" data-large="2/381_1_47/0102.jpg"
                                data-largeim="1/381_1_47/0102.zif"
                                alt="image102"></a></li>
                    <li><a><img
                            src="../3/23/102.jpg" data-large="2/381_1_47/0103.jpg" data-largeim="1/381_1_47/0103.zif"
                            alt="image103"></a></li>
                    <li><a><img
                            src="../3/23/103.jpg" data-large="2/381_1_47/0104.jpg" data-largeim="1/381_1_47/0104.zif"
                            alt="image104"></a></li>
                    <li><a><img
                            src="../3/23/104.jpg" data-large="2/381_1_47/0105.jpg" data-largeim="1/381_1_47/0105.zif"
                            alt="image105"></a></li>
                    <li><a><img
                            src="../3/23/105.jpg" data-large="2/381_1_47/0106.jpg" data-largeim="1/381_1_47/0106.zif"
                            alt="image106"></a></li>
                    <li><a><img
                            src="../3/23/106.jpg" data-large="2/381_1_47/0107.jpg" data-largeim="1/381_1_47/0107.zif"
                            alt="image107"></a></li>
                    <li><a><img
                            src="../3/23/107.jpg" data-large="2/381_1_47/0108.jpg" data-largeim="1/381_1_47/0108.zif"
                            alt="image108"></a></li>
                    <li><a><img
                            src="../3/23/108.jpg" data-large="2/381_1_47/0109.jpg" data-largeim="1/381_1_47/0109.zif"
                            alt="image109"></a></li>
                    <li><a><img
                            src="../3/23/109.jpg" data-large="2/381_1_47/0110.jpg" data-largeim="1/381_1_47/0110.zif"
                            alt="image110"></a></li>
                    <li><a><img
                            src="../3/23/110.jpg" data-large="2/381_1_47/0111.jpg" data-largeim="1/381_1_47/0111.zif"
                            alt="image111"></a></li>
                    <li><a><img
                            src="../3/23/111.jpg" data-large="2/381_1_47/0112.jpg" data-largeim="1/381_1_47/0112.zif"
                            alt="image112"></a></li>
                    <li><a><img
                            src="../3/23/112.jpg" data-large="2/381_1_47/0113.jpg" data-largeim="1/381_1_47/0113.zif"
                            alt="image113"></a></li>
                    <li><a><img
                            src="../3/23/113.jpg" data-large="2/381_1_47/0114.jpg" data-largeim="1/381_1_47/0114.zif"
                            alt="image114"></a></li>
                    <li><a><img
                            src="../3/23/114.jpg" data-large="2/381_1_47/0115.jpg" data-largeim="1/381_1_47/0115.zif"
                            alt="image115"></a></li>
                    <li><a><img
                            src="../3/23/115.jpg" data-large="2/381_1_47/0116.jpg" data-largeim="1/381_1_47/0116.zif"
                            alt="image116"></a></li>
                    <li><a><img
                            src="../3/23/116.jpg" data-large="2/381_1_47/0117.jpg" data-largeim="1/381_1_47/0117.zif"
                            alt="image117"></a></li>
                    <li><a><img
                            src="../3/23/117.jpg" data-large="2/381_1_47/0118.jpg" data-largeim="1/381_1_47/0118.zif"
                            alt="image118"></a></li>
                    <li><a><img
                            src="../3/23/118.jpg" data-large="2/381_1_47/0119.jpg" data-largeim="1/381_1_47/0119.zif"
                            alt="image119"></a></li>
                    <li><a><img
                            src="../3/23/119.jpg" data-large="2/381_1_47/0120.jpg" data-largeim="1/381_1_47/0120.zif"
                            alt="image120"></a></li>
                    <li><a><img
                            src="../3/23/120.jpg" data-large="2/381_1_47/0121.jpg" data-largeim="1/381_1_47/0121.zif"
                            alt="image121"></a></li>
                    <li><a><img
                            src="../3/23/121.jpg" data-large="2/381_1_47/0122.jpg" data-largeim="1/381_1_47/0122.zif"
                            alt="image122"></a></li>
                    <li><a><img
                            src="../3/23/122.jpg" data-large="2/381_1_47/0123.jpg" data-largeim="1/381_1_47/0123.zif"
                            alt="image123"></a></li>
                    <li><a><img
                            src="../3/23/123.jpg" data-large="2/381_1_47/0124.jpg" data-largeim="1/381_1_47/0124.zif"
                            alt="image124"></a></li>
                    <li><a><img
                            src="../3/23/124.jpg" data-large="2/381_1_47/0125.jpg" data-largeim="1/381_1_47/0125.zif"
                            alt="image125"></a></li>
                    <li><a><img
                            src="../3/23/125.jpg" data-large="2/381_1_47/0126.jpg" data-largeim="1/381_1_47/0126.zif"
                            alt="image126"></a></li>
                    <li><a><img
                            src="../3/23/126.jpg" data-large="2/381_1_47/0127.jpg" data-largeim="1/381_1_47/0127.zif"
                            alt="image127"></a></li>
                    <li><a><img
                            src="../3/23/127.jpg" data-large="2/381_1_47/0128.jpg" data-largeim="1/381_1_47/0128.zif"
                            alt="image128"></a></li>
                    <li><a><img
                            src="../3/23/128.jpg" data-large="2/381_1_47/0129.jpg" data-largeim="1/381_1_47/0129.zif"
                            alt="image129"></a></li>
                    <li><a><img
                            src="../3/23/129.jpg" data-large="2/381_1_47/0130.jpg" data-largeim="1/381_1_47/0130.zif"
                            alt="image130"></a></li>
                    <li><a><img
                            src="../3/23/130.jpg" data-large="2/381_1_47/0131.jpg" data-largeim="1/381_1_47/0131.zif"
                            alt="image131"></a></li>
                    <li><a><img
                            src="../3/23/131.jpg" data-large="2/381_1_47/0132.jpg" data-largeim="1/381_1_47/0132.zif"
                            alt="image132"></a></li>
                    <li><a><img
                            src="../3/23/132.jpg" data-large="2/381_1_47/0133.jpg" data-largeim="1/381_1_47/0133.zif"
                            alt="image133"></a></li>
                    <li><a><img
                            src="../3/23/133.jpg" data-large="2/381_1_47/0134.jpg" data-largeim="1/381_1_47/0134.zif"
                            alt="image134"></a></li>
                    <li><a><img
                            src="../3/23/134.jpg" data-large="2/381_1_47/0135.jpg" data-largeim="1/381_1_47/0135.zif"
                            alt="image135"></a></li>
                    <li><a><img
                            src="../3/23/135.jpg" data-large="2/381_1_47/0136.jpg" data-largeim="1/381_1_47/0136.zif"
                            alt="image136"></a></li>
                    <li><a><img
                            src="../3/23/136.jpg" data-large="2/381_1_47/0137.jpg" data-largeim="1/381_1_47/0137.zif"
                            alt="image137"></a></li>
                    <li><a><img
                            src="../3/23/137.jpg" data-large="2/381_1_47/0138.jpg" data-largeim="1/381_1_47/0138.zif"
                            alt="image138"></a></li>
                    <li><a><img
                            src="../3/23/138.jpg" data-large="2/381_1_47/0139.jpg" data-largeim="1/381_1_47/0139.zif"
                            alt="image139"></a></li>
                    <li><a><img
                            src="../3/23/139.jpg" data-large="2/381_1_47/0140.jpg" data-largeim="1/381_1_47/0140.zif"
                            alt="image140"></a></li>
                    <li><a><img
                            src="../3/23/140.jpg" data-large="2/381_1_47/0141.jpg" data-largeim="1/381_1_47/0141.zif"
                            alt="image141"></a></li>
                    <li><a><img
                            src="../3/23/141.jpg" data-large="2/381_1_47/0142.jpg" data-largeim="1/381_1_47/0142.zif"
                            alt="image142"></a></li>
                    <li><a><img
                            src="../3/23/142.jpg" data-large="2/381_1_47/0143.jpg" data-largeim="1/381_1_47/0143.zif"
                            alt="image143"></a></li>
                    <li><a><img
                            src="../3/23/143.jpg" data-large="2/381_1_47/0144.jpg" data-largeim="1/381_1_47/0144.zif"
                            alt="image144"></a></li>
                    <li><a><img
                            src="../3/23/144.jpg" data-large="2/381_1_47/0145.jpg" data-largeim="1/381_1_47/0145.zif"
                            alt="image145"></a></li>
                    <li><a><img
                            src="../3/23/145.jpg" data-large="2/381_1_47/0146.jpg" data-largeim="1/381_1_47/0146.zif"
                            alt="image146"></a></li>
                    <li><a><img
                            src="../3/23/146.jpg" data-large="2/381_1_47/0147.jpg" data-largeim="1/381_1_47/0147.zif"
                            alt="image147"></a></li>
                    <li><a><img
                            src="../3/23/147.jpg" data-large="2/381_1_47/0148.jpg" data-largeim="1/381_1_47/0148.zif"
                            alt="image148"></a></li>
                    <li><a><img
                            src="../3/23/148.jpg" data-large="2/381_1_47/0149.jpg" data-largeim="1/381_1_47/0149.zif"
                            alt="image149"></a></li>
                    <li><a><img
                            src="../3/23/149.jpg" data-large="2/381_1_47/0150.jpg" data-largeim="1/381_1_47/0150.zif"
                            alt="image150"></a></li>
                    <li><a><img
                            src="../3/23/150.jpg" data-large="2/381_1_47/0151.jpg" data-largeim="1/381_1_47/0151.zif"
                            alt="image151"></a></li>
                    <li><a><img
                            src="../3/23/151.jpg" data-large="2/381_1_47/0152.jpg" data-largeim="1/381_1_47/0152.zif"
                            alt="image152"></a></li>
                    <li><a><img
                            src="../3/23/152.jpg" data-large="2/381_1_47/0153.jpg" data-largeim="1/381_1_47/0153.zif"
                            alt="image153"></a></li>
                    <li><a><img
                            src="../3/23/153.jpg" data-large="2/381_1_47/0154.jpg" data-largeim="1/381_1_47/0154.zif"
                            alt="image154"></a></li>
                    <li><a><img
                            src="../3/23/154.jpg" data-large="2/381_1_47/0155.jpg" data-largeim="1/381_1_47/0155.zif"
                            alt="image155"></a></li>
                    <li><a><img
                            src="../3/23/155.jpg" data-large="2/381_1_47/0156.jpg" data-largeim="1/381_1_47/0156.zif"
                            alt="image156"></a></li>
                    <li><a><img
                            src="../3/23/156.jpg" data-large="2/381_1_47/0157.jpg" data-largeim="1/381_1_47/0157.zif"
                            alt="image157"></a></li>
                    <li><a><img
                            src="../3/23/157.jpg" data-large="2/381_1_47/0158.jpg" data-largeim="1/381_1_47/0158.zif"
                            alt="image158"></a></li>
                    <li><a><img
                            src="../3/23/158.jpg" data-large="2/381_1_47/0159.jpg" data-largeim="1/381_1_47/0159.zif"
                            alt="image159"></a></li>
                    <li><a><img
                            src="../3/23/159.jpg" data-large="2/381_1_47/0160.jpg" data-largeim="1/381_1_47/0160.zif"
                            alt="image160"></a></li>
                    <li><a><img
                            src="../3/23/160.jpg" data-large="2/381_1_47/0161.jpg" data-largeim="1/381_1_47/0161.zif"
                            alt="image161"></a></li>
                    <li><a><img
                            src="../3/23/161.jpg" data-large="2/381_1_47/0162.jpg" data-largeim="1/381_1_47/0162.zif"
                            alt="image162"></a></li>
                    <li><a><img
                            src="../3/23/162.jpg" data-large="2/381_1_47/0163.jpg" data-largeim="1/381_1_47/0163.zif"
                            alt="image163"></a></li>
                    <li><a><img
                            src="../3/23/163.jpg" data-large="2/381_1_47/0164.jpg" data-largeim="1/381_1_47/0164.zif"
                            alt="image164"></a></li>
                    <li><a><img
                            src="../3/23/164.jpg" data-large="2/381_1_47/0165.jpg" data-largeim="1/381_1_47/0165.zif"
                            alt="image165"></a></li>
                    <li><a><img
                            src="../3/23/165.jpg" data-large="2/381_1_47/0166.jpg" data-largeim="1/381_1_47/0166.zif"
                            alt="image166"></a></li>
                    <li><a><img
                            src="../3/23/166.jpg" data-large="2/381_1_47/0167.jpg" data-largeim="1/381_1_47/0167.zif"
                            alt="image167"></a></li>
                    <li><a><img
                            src="../3/23/167.jpg" data-large="2/381_1_47/0168.jpg" data-largeim="1/381_1_47/0168.zif"
                            alt="image168"></a></li>
                    <li><a><img
                            src="../3/23/168.jpg" data-large="2/381_1_47/0169.jpg" data-largeim="1/381_1_47/0169.zif"
                            alt="image169"></a></li>
                    <li><a><img
                            src="../3/23/169.jpg" data-large="2/381_1_47/0170.jpg" data-largeim="1/381_1_47/0170.zif"
                            alt="image170"></a></li>
                </ul>
            </div>
        `;
        const result = parseRgada('zif');

        expect(result?.length).toEqual(170);
        expect(result).toEqual([
            'http://rgada.info/kueh/1/381_1_47/0001.zif',
            'http://rgada.info/kueh/1/381_1_47/0002.zif',
            'http://rgada.info/kueh/1/381_1_47/0003.zif',
            'http://rgada.info/kueh/1/381_1_47/0004.zif',
            'http://rgada.info/kueh/1/381_1_47/0005.zif',
            'http://rgada.info/kueh/1/381_1_47/0006.zif',
            'http://rgada.info/kueh/1/381_1_47/0007.zif',
            'http://rgada.info/kueh/1/381_1_47/0008.zif',
            'http://rgada.info/kueh/1/381_1_47/0009.zif',
            'http://rgada.info/kueh/1/381_1_47/0010.zif',
            'http://rgada.info/kueh/1/381_1_47/0011.zif',
            'http://rgada.info/kueh/1/381_1_47/0012.zif',
            'http://rgada.info/kueh/1/381_1_47/0013.zif',
            'http://rgada.info/kueh/1/381_1_47/0014.zif',
            'http://rgada.info/kueh/1/381_1_47/0015.zif',
            'http://rgada.info/kueh/1/381_1_47/0016.zif',
            'http://rgada.info/kueh/1/381_1_47/0017.zif',
            'http://rgada.info/kueh/1/381_1_47/0018.zif',
            'http://rgada.info/kueh/1/381_1_47/0019.zif',
            'http://rgada.info/kueh/1/381_1_47/0020.zif',
            'http://rgada.info/kueh/1/381_1_47/0021.zif',
            'http://rgada.info/kueh/1/381_1_47/0022.zif',
            'http://rgada.info/kueh/1/381_1_47/0023.zif',
            'http://rgada.info/kueh/1/381_1_47/0024.zif',
            'http://rgada.info/kueh/1/381_1_47/0025.zif',
            'http://rgada.info/kueh/1/381_1_47/0026.zif',
            'http://rgada.info/kueh/1/381_1_47/0027.zif',
            'http://rgada.info/kueh/1/381_1_47/0028.zif',
            'http://rgada.info/kueh/1/381_1_47/0029.zif',
            'http://rgada.info/kueh/1/381_1_47/0030.zif',
            'http://rgada.info/kueh/1/381_1_47/0031.zif',
            'http://rgada.info/kueh/1/381_1_47/0032.zif',
            'http://rgada.info/kueh/1/381_1_47/0033.zif',
            'http://rgada.info/kueh/1/381_1_47/0034.zif',
            'http://rgada.info/kueh/1/381_1_47/0035.zif',
            'http://rgada.info/kueh/1/381_1_47/0036.zif',
            'http://rgada.info/kueh/1/381_1_47/0037.zif',
            'http://rgada.info/kueh/1/381_1_47/0038.zif',
            'http://rgada.info/kueh/1/381_1_47/0039.zif',
            'http://rgada.info/kueh/1/381_1_47/0040.zif',
            'http://rgada.info/kueh/1/381_1_47/0041.zif',
            'http://rgada.info/kueh/1/381_1_47/0042.zif',
            'http://rgada.info/kueh/1/381_1_47/0043.zif',
            'http://rgada.info/kueh/1/381_1_47/0044.zif',
            'http://rgada.info/kueh/1/381_1_47/0045.zif',
            'http://rgada.info/kueh/1/381_1_47/0046.zif',
            'http://rgada.info/kueh/1/381_1_47/0047.zif',
            'http://rgada.info/kueh/1/381_1_47/0048.zif',
            'http://rgada.info/kueh/1/381_1_47/0049.zif',
            'http://rgada.info/kueh/1/381_1_47/0050.zif',
            'http://rgada.info/kueh/1/381_1_47/0051.zif',
            'http://rgada.info/kueh/1/381_1_47/0052.zif',
            'http://rgada.info/kueh/1/381_1_47/0053.zif',
            'http://rgada.info/kueh/1/381_1_47/0054.zif',
            'http://rgada.info/kueh/1/381_1_47/0055.zif',
            'http://rgada.info/kueh/1/381_1_47/0056.zif',
            'http://rgada.info/kueh/1/381_1_47/0057.zif',
            'http://rgada.info/kueh/1/381_1_47/0058.zif',
            'http://rgada.info/kueh/1/381_1_47/0059.zif',
            'http://rgada.info/kueh/1/381_1_47/0060.zif',
            'http://rgada.info/kueh/1/381_1_47/0061.zif',
            'http://rgada.info/kueh/1/381_1_47/0062.zif',
            'http://rgada.info/kueh/1/381_1_47/0063.zif',
            'http://rgada.info/kueh/1/381_1_47/0064.zif',
            'http://rgada.info/kueh/1/381_1_47/0065.zif',
            'http://rgada.info/kueh/1/381_1_47/0066.zif',
            'http://rgada.info/kueh/1/381_1_47/0067.zif',
            'http://rgada.info/kueh/1/381_1_47/0068.zif',
            'http://rgada.info/kueh/1/381_1_47/0069.zif',
            'http://rgada.info/kueh/1/381_1_47/0070.zif',
            'http://rgada.info/kueh/1/381_1_47/0071.zif',
            'http://rgada.info/kueh/1/381_1_47/0072.zif',
            'http://rgada.info/kueh/1/381_1_47/0073.zif',
            'http://rgada.info/kueh/1/381_1_47/0074.zif',
            'http://rgada.info/kueh/1/381_1_47/0075.zif',
            'http://rgada.info/kueh/1/381_1_47/0076.zif',
            'http://rgada.info/kueh/1/381_1_47/0077.zif',
            'http://rgada.info/kueh/1/381_1_47/0078.zif',
            'http://rgada.info/kueh/1/381_1_47/0079.zif',
            'http://rgada.info/kueh/1/381_1_47/0080.zif',
            'http://rgada.info/kueh/1/381_1_47/0081.zif',
            'http://rgada.info/kueh/1/381_1_47/0082.zif',
            'http://rgada.info/kueh/1/381_1_47/0083.zif',
            'http://rgada.info/kueh/1/381_1_47/0084.zif',
            'http://rgada.info/kueh/1/381_1_47/0085.zif',
            'http://rgada.info/kueh/1/381_1_47/0086.zif',
            'http://rgada.info/kueh/1/381_1_47/0087.zif',
            'http://rgada.info/kueh/1/381_1_47/0088.zif',
            'http://rgada.info/kueh/1/381_1_47/0089.zif',
            'http://rgada.info/kueh/1/381_1_47/0090.zif',
            'http://rgada.info/kueh/1/381_1_47/0091.zif',
            'http://rgada.info/kueh/1/381_1_47/0092.zif',
            'http://rgada.info/kueh/1/381_1_47/0093.zif',
            'http://rgada.info/kueh/1/381_1_47/0094.zif',
            'http://rgada.info/kueh/1/381_1_47/0095.zif',
            'http://rgada.info/kueh/1/381_1_47/0096.zif',
            'http://rgada.info/kueh/1/381_1_47/0097.zif',
            'http://rgada.info/kueh/1/381_1_47/0098.zif',
            'http://rgada.info/kueh/1/381_1_47/0099.zif',
            'http://rgada.info/kueh/1/381_1_47/0100.zif',
            'http://rgada.info/kueh/1/381_1_47/0101.zif',
            'http://rgada.info/kueh/1/381_1_47/0102.zif',
            'http://rgada.info/kueh/1/381_1_47/0103.zif',
            'http://rgada.info/kueh/1/381_1_47/0104.zif',
            'http://rgada.info/kueh/1/381_1_47/0105.zif',
            'http://rgada.info/kueh/1/381_1_47/0106.zif',
            'http://rgada.info/kueh/1/381_1_47/0107.zif',
            'http://rgada.info/kueh/1/381_1_47/0108.zif',
            'http://rgada.info/kueh/1/381_1_47/0109.zif',
            'http://rgada.info/kueh/1/381_1_47/0110.zif',
            'http://rgada.info/kueh/1/381_1_47/0111.zif',
            'http://rgada.info/kueh/1/381_1_47/0112.zif',
            'http://rgada.info/kueh/1/381_1_47/0113.zif',
            'http://rgada.info/kueh/1/381_1_47/0114.zif',
            'http://rgada.info/kueh/1/381_1_47/0115.zif',
            'http://rgada.info/kueh/1/381_1_47/0116.zif',
            'http://rgada.info/kueh/1/381_1_47/0117.zif',
            'http://rgada.info/kueh/1/381_1_47/0118.zif',
            'http://rgada.info/kueh/1/381_1_47/0119.zif',
            'http://rgada.info/kueh/1/381_1_47/0120.zif',
            'http://rgada.info/kueh/1/381_1_47/0121.zif',
            'http://rgada.info/kueh/1/381_1_47/0122.zif',
            'http://rgada.info/kueh/1/381_1_47/0123.zif',
            'http://rgada.info/kueh/1/381_1_47/0124.zif',
            'http://rgada.info/kueh/1/381_1_47/0125.zif',
            'http://rgada.info/kueh/1/381_1_47/0126.zif',
            'http://rgada.info/kueh/1/381_1_47/0127.zif',
            'http://rgada.info/kueh/1/381_1_47/0128.zif',
            'http://rgada.info/kueh/1/381_1_47/0129.zif',
            'http://rgada.info/kueh/1/381_1_47/0130.zif',
            'http://rgada.info/kueh/1/381_1_47/0131.zif',
            'http://rgada.info/kueh/1/381_1_47/0132.zif',
            'http://rgada.info/kueh/1/381_1_47/0133.zif',
            'http://rgada.info/kueh/1/381_1_47/0134.zif',
            'http://rgada.info/kueh/1/381_1_47/0135.zif',
            'http://rgada.info/kueh/1/381_1_47/0136.zif',
            'http://rgada.info/kueh/1/381_1_47/0137.zif',
            'http://rgada.info/kueh/1/381_1_47/0138.zif',
            'http://rgada.info/kueh/1/381_1_47/0139.zif',
            'http://rgada.info/kueh/1/381_1_47/0140.zif',
            'http://rgada.info/kueh/1/381_1_47/0141.zif',
            'http://rgada.info/kueh/1/381_1_47/0142.zif',
            'http://rgada.info/kueh/1/381_1_47/0143.zif',
            'http://rgada.info/kueh/1/381_1_47/0144.zif',
            'http://rgada.info/kueh/1/381_1_47/0145.zif',
            'http://rgada.info/kueh/1/381_1_47/0146.zif',
            'http://rgada.info/kueh/1/381_1_47/0147.zif',
            'http://rgada.info/kueh/1/381_1_47/0148.zif',
            'http://rgada.info/kueh/1/381_1_47/0149.zif',
            'http://rgada.info/kueh/1/381_1_47/0150.zif',
            'http://rgada.info/kueh/1/381_1_47/0151.zif',
            'http://rgada.info/kueh/1/381_1_47/0152.zif',
            'http://rgada.info/kueh/1/381_1_47/0153.zif',
            'http://rgada.info/kueh/1/381_1_47/0154.zif',
            'http://rgada.info/kueh/1/381_1_47/0155.zif',
            'http://rgada.info/kueh/1/381_1_47/0156.zif',
            'http://rgada.info/kueh/1/381_1_47/0157.zif',
            'http://rgada.info/kueh/1/381_1_47/0158.zif',
            'http://rgada.info/kueh/1/381_1_47/0159.zif',
            'http://rgada.info/kueh/1/381_1_47/0160.zif',
            'http://rgada.info/kueh/1/381_1_47/0161.zif',
            'http://rgada.info/kueh/1/381_1_47/0162.zif',
            'http://rgada.info/kueh/1/381_1_47/0163.zif',
            'http://rgada.info/kueh/1/381_1_47/0164.zif',
            'http://rgada.info/kueh/1/381_1_47/0165.zif',
            'http://rgada.info/kueh/1/381_1_47/0166.zif',
            'http://rgada.info/kueh/1/381_1_47/0167.zif',
            'http://rgada.info/kueh/1/381_1_47/0168.zif',
            'http://rgada.info/kueh/1/381_1_47/0169.zif',
            'http://rgada.info/kueh/1/381_1_47/0170.zif',
        ]);
    });
});
