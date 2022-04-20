import bassC1 from '../../assets/sounds/bass_C_1.mp3'
import bassCm2 from '../../assets/sounds/bass_Cm_2.mp3'
import bassC3 from '../../assets/sounds/bass_c_3.mp3'
import bassC4 from '../../assets/sounds/bass_c_4.mp3'
import bassCm5 from '../../assets/sounds/bass_Cm_5.mp3'
import drums2 from '../../assets/sounds/drum_2.mp3'
import drum from '../../assets/sounds/drum.mp3'
import guitar from '../../assets/sounds/guitar_c_1.mp3'
import piano from '../../assets/sounds/piano_Cm_1.mp3'
import sax from '../../assets/sounds/sax_Cm_1.mp3'
import shaker from '../../assets/sounds/shaker.mp3'

export const tracks = [{
    id: 1,
    title: 'Bass',
    path: [bassC1, bassCm2, bassC3, bassC4, bassCm5],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 1,
    color: '#166d3b'
}, {
    id: 2,
    title: 'Drums',
    path: [drum, drums2],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 1,
    color: '#04619f'
}, {
    id: 3,
    title: 'Shaker',
    path: [shaker],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 1,
    color: '#923cb5'
}, {
    id: 4,
    title: 'Guitar',
    path: [guitar],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 1,
    color: '#b82e1f'
}, {
    id: 5,
    title: 'Saxophone',
    path: [sax],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 1,
    color: '#ff8851'
}, {
    id: 6,
    title: 'Piano',
    path: [piano],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 1,
    color: '#5fdff2'
}]