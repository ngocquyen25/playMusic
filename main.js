const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY1 = 'NGOCQUYEN_PLAYER'

const btn = $('.switch')
const containerWeb =  $('.main')
const listSong = $('.listSong')
const musicPlayback = $('.musicPlayback')

const heading = $('.musicPlayback__songName h2')
const cdThump = $('.musicPlayback__songImage')
const cdThumpWidth = cdThump.offsetWidth
const audio = $('#audio')
const progress = $('.musicPlayback__process input')
const volumeBar = $('.musicPlayback__volume input')

const returnBtn = $('.control__return')
const returnBtnIcon = $('.control__return i')
const previousBtn = $('.control__previousSong')
const nextBtn = $('.control__nextSong')
const randomBtn = $('.control__random')
const randomBtnIcon = $('.control__random i')

const playButton = $('.control__playSong')
const playIcon = $('.control__playSong .icon-play')
const pauseIcon = $('.control__playSong .icon-pause')

const timeCurrent = $('.timeCurrent')
const timeEnd = $('.timeEnd')

const waveMusic = $('.wave')
const progessBtn = $('.musicPlayback__process input[type=range]')

// quay cho đĩa
const CDThumpAnimate = cdThump.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 10000, //7 seconds
    iterations: Infinity
})
CDThumpAnimate.pause()

const app = {
    isPlaying: false,
    isRandom: false,
    isReturn: false,
    currentIndex: 0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY1)) || {},
    

    songs: [
        {
            name: 'Nơi Này Có Anh',
            singer: 'Sơn Tùng',
            path: './assets/music/song_1.mp3',
            image: './assets/img/img_1.jpg',
        },
        {
            name: 'Chạy Ngay Đi',
            singer: 'Sơn Tùng',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.png',
        },
        {
            name: 'Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau',
            singer: 'Ca Sĩ',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.png',
        },
        {
            name: 'Cô Gái Này Là Của Ai',
            singer: 'Ca Sĩ',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.png',
        },
        {
            name: 'Chuyện Đôi Ta',
            singer: 'Ca Sĩ',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.png',
        },
        {
            name: 'Ngày Đầu Tiên',
            singer: 'Ca Sĩ',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.png',
        },
        {
            name: 'Ghé Vào Tai',
            singer: 'Umie',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.png',
        },
        {
            name: 'Cô Đơn Trên Sofa',
            singer: 'KAI ĐINH x MIN x GREY D',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.png',
        },
        {
            name: 'Không Yêu Xin Đừng Nói',
            singer: 'Umie',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.png',
        },
        {
            name: 'Chỉ Là Muốn nói',
            singer: 'Khải',
            path: './assets/music/song9.mp3',
            image: './assets/img/song9.png',
        },
        {
            name: 'Đường Tôi Chở Em Về',
            singer: 'Bùi Trường Linh',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.png',
        },
        {
            name: 'Em Của Quá Khứ',
            singer: 'Ngọc Quyền',
            path: './assets/music/song11.mp3',
            image: './assets/img/song11.png',
        },
        {
            name: 'Exs Hate Me',
            singer: 'Bray x Masew if AMEE',
            path: './assets/music/song12.mp3',
            image: './assets/img/song12.png',
        },
        {
            name: 'Ghé Qua',
            singer: 'Dick xPC x Tofu',
            path: './assets/music/song13.mp3',
            image: './assets/img/song13.png',
        },
        {
            name: 'Là Anh',
            singer: 'Nguyễn Hoàng',
            path: './assets/music/song14.mp3',
            image: './assets/img/song14.png',
        },
        {
            name: 'Cho Em Một Lần Yêu',
            singer: 'Phạm Hoàng Dũng',
            path: './assets/music/song15.mp3',
            image: './assets/img/song15.png',
        },
        {
            name: 'Nhường Hạnh Phúc Cho Anh',
            singer: 'Ngọc Kayla',
            path: './assets/music/song16.mp3',
            image: './assets/img/song16.png',
        },
        {
            name: 'Nothin On Me',
            singer: 'Leah Marie Perez',
            path: './assets/music/song17.mp3',
            image: './assets/img/song17.png',
        },
        {
            name: 'Suýt Nữa Thì',
            singer: 'ANDIEZ',
            path: './assets/music/song18.mp3',
            image: './assets/img/song18.png',
        },
        {
            name: 'Tệ Thật, Anh Nhớ Em',
            singer: 'Thanh Hưng',
            path: './assets/music/song19.mp3',
            image: './assets/img/song19.png',
        },
        {
            name: 'Anh Chưa Thương Em Đến Vậy Đâu',
            singer: 'Lady Mây',
            path: './assets/music/song20.mp3',
            image: './assets/img/song20.png',
        }
        
    ],
    
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY1, JSON.stringify(this.config));
      },
    
    // ***************************HÀM XỬ LÝ GIAO DIỆN BÀI HÁT ĐANG ĐƯỢC PHÁT******************
            addActiveCurrentSong: function() {
                $('[data-id="'+this.currentIndex+'"]').classList.add('activeSong')
            },
            removeActivePreviousSong: function(currentSong, currentWave) {
                currentSong.classList.remove('activeSong')
                currentWave.classList.remove('display-flex')
                    },

    switchBtn: function() {
        btn.onclick = function() {
            containerWeb.classList.toggle('main--2')
            listSong.classList.toggle('listSong--2')
            listSong.classList.toggle('listSong--1')
            musicPlayback.classList.toggle('musicPlayback--2')
            app.scrollToActiveSong()
        }
        btn.addEventListener('mousedown', function() {
            btn.classList.add('switch--click')
        })
        btn.addEventListener('mouseup', function() {
            btn.classList.remove('switch--click')
        })
    },
    
   
    renderPlayList: function() {
        const htmls = this.songs.map(function(song,index) {
            return `
            <div class="song" data-id="${index}">
                <div class="image">
                    <img src="${song.image}" alt="">
                    <div class="wave">
                        <div class="items"></div>
                        <div class="items"></div>
                        <div class="items"></div>
                        <div class="items"></div>
                        <div class="items"></div>
                    </div>
                </div>
                <div class="content">
                    <div class="content__name">${song.name}</div>
                    <div class="content__author">${song.singer}</div>
                </div>
                <div class="moreInformation">
                    <i class="fas fa-ellipsis-h"></i>
                </div>            
            </div>
        `
       })
       $('.listSong').innerHTML = htmls.join('');
    },
    
    
    
    timeUpdate: function() {
        audio.ontimeupdate = function() {
        const currentTime = timeFormat(audio.currentTime)
        timeCurrent.textContent = currentTime
        const endTime = timeFormat(audio.duration)
            // thanh progess
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            // update thời gian của bài hát
            function timeFormat(seconds) {
                let minute = Math.floor(seconds / 60);
                let second = Math.floor(seconds % 60);
                minute = minute < 10 ? "0" + minute : minute;
                second = second < 10 ? "0" + second : second;
                return minute + ":" + second;
            }
            if (endTime != 'NaN:NaN') {
                timeEnd.textContent = endTime
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.song.activeSong').scrollIntoView({
                behavior: "smooth",
                block: 'end'
            })
        },100) 
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        
        this.isReturn = this.config.isReturn
    },
    
    whenPlay:function () {                  
        const currentSongWave = $('[data-id="'+app.currentIndex+'"] .wave')
       CDThumpAnimate.play()
       audio.play()
       pauseIcon.classList.add('fa-pause')
       playIcon.classList.remove('fa-play')
       app.addActiveCurrentSong() 
       currentSongWave.classList.add('display-flex')
   },
    totalPlayMusicFunction:function () {
        app.loadCurrentSong()
        app.whenPlay()
        app.addActiveCurrentSong() 
        app.isPlaying = true
        app.scrollToActiveSong()
    },
    nextSong: function () {
        const songsLength = app.songs.length
        const currentSong = $('[data-id="'+app.currentIndex+'"]')
        const currentSongWave = $('[data-id="'+app.currentIndex+'"] .wave')
        app.removeActivePreviousSong(currentSong,currentSongWave)
        app.currentIndex++
        if (app.currentIndex >= songsLength) {
            app.currentIndex = 0
        }  
        app.totalPlayMusicFunction()
    },
    defindeProperties: function() {
        // ĐỊNH NGHĨA CÁC THUỘC TÍNH
        Object.defineProperty(this,'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        
        heading.textContent = this.currentSong.name
        cdThump.src = this.currentSong.image
        audio.src = this.currentSong.path   
    },
    
    handleEvent: function() {
        const _this = this
        const songsLength = _this.songs.length
 
        // ****************************************** XỬ LÝ CD************************************************
                //  Xử lý phóng to, thu nhỏ CD
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop
                    const newCdThumpwidth = cdThumpWidth - scrollTop
                    cdThump.style.width = newCdThumpwidth > 0 ? newCdThumpwidth + 'px' : 0
                    cdThump.style.height = newCdThumpwidth > 0 ? newCdThumpwidth + 'px' : 0
                    cdThump.style.opacity = newCdThumpwidth/cdThumpWidth
                    if (scrollTop > 100) {
                    musicPlayback.classList.add('musicPlayback--scroll')
                    } else {
                    musicPlayback.classList.remove('musicPlayback--scroll')
                    }
                }

                
                
        
        // ***************************Xử lý khi click play và nút space bar*********************************
                function whenPause() {         
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    CDThumpAnimate.pause()
                    audio.pause()
                    pauseIcon.classList.remove('fa-pause')
                    playIcon.classList.add('fa-play')
                    currentSongWave.classList.remove('display-flex') 
                }
                

                function clickPlay() {
                    if (_this.isPlaying) {    
                        whenPause()
                    } else {        
                        app.whenPlay()  
                    }
                    // khi song được play
                    audio.onplay = function() {
                        _this.isPlaying = true
                    }
                    // khi song được pause
                    audio.onpause = function() {
                        _this.isPlaying = false
                    }
                }
                playButton.onclick = clickPlay
                window.addEventListener('keydown', function(e){
                    if (e.which === 32) {
                        clickPlay()
                        e.preventDefault();
                    }
                });
        
        // *********************************************XỬ LÝ CÁC THAO TÁC TRÊN BẢNG ĐIỀU KHIỂN**************************************
                // toàn bộ hàm khi phát nhạc
                

                // tự động chuyển bài hát mới khi hết thời gian
                audio.onended = function() {
                    if(_this.isReturn === false || _this.isRandom === false) {
                        app.nextSong()                      
                    }  
                }
                
                // xử lý khi tua bài hát
                progress.oninput = function(e) {
                    const seekTime = e.target.value * audio.duration / 100
                    audio.currentTime = seekTime
                }

                // xử lý tắt âm khi tua bài hát trên điện thoại
                progessBtn.addEventListener('touchstart', function() {
                    whenPause()
                })
                progessBtn.addEventListener('touchend',function() {
                    clickPlay()
                })

                // xử lý tắt âm khi tua bài hát trên máy tính
                progessBtn.addEventListener('mousedown', function() {
                    whenPause()
                })
                progessBtn.addEventListener('mouseup',function() {
                    clickPlay()
                })

                // xử lý volume của bài hát
                volumeBar.oninput = function(e) {
                    audio.volume = e.target.value
                }

                // Xử lý khi nghe bài hát trước đó
             
                function previousSong() {
                    // const songsLength = _this.songs.length
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    _this.removeActivePreviousSong(currentSong,currentSongWave)
                    _this.currentIndex--
                    if (_this.currentIndex < 0) {
                        _this.currentIndex = songsLength -1
                    }  
                    app.totalPlayMusicFunction()
                }
                previousBtn.onclick = previousSong

                // Xử lý khi nghe bài hát tiếp theo
                nextBtn.onclick = app.nextSong

                // Xử lý khi return bài hát
                returnBtnIcon.onclick = function() {
                    _this.isReturn =! _this.isReturn
                    _this.isRandom = false
                    app.setConfig('isReturn', app.isReturn); 
                    app.setConfig('isRandom', app.isRandom); 
                    returnBtnIcon.classList.toggle('activeBtn', _this.isReturn) 
                    randomBtnIcon.classList.remove('activeBtn') 
                    if (!_this.isReturn && !_this.isRandom) {
                        audio.onended = function() {
                            nextSong() 
                        } 
                        nextBtn.onclick = app.nextSong
                        previousBtn.onclick = previousSong    
                    } 
                    if (!_this.isReturn && _this.isRandom) {
                        nextBtn.onclick = randomSong
                        previousBtn.onclick = randomSong
                    }
                    if (_this.isReturn) {
                        audio.onended = function() {
                            audio.play() 
                        } 
                        nextBtn.onclick = app.nextSong
                        previousBtn.onclick = previousSong  
                    }
                }    
                
                // Xử lý khi random bài hát
                function randomSong() {
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    _this.removeActivePreviousSong(currentSong,currentSongWave)
                    let newIndex
                    do {
                        newIndex = Math.floor(Math.random() * _this.songs.length)
                    } while(newIndex ==_this.currentIndex)
                    _this.currentIndex = newIndex
                    app.totalPlayMusicFunction()               
                }
                randomBtn.onclick = function() {
                    _this.isRandom =! _this.isRandom
                    _this.isReturn = false
                    app.setConfig('isRandom', app.isRandom); 
                    app.setConfig('isReturn', app.isReturn); 
                       
                    randomBtnIcon.classList.toggle('activeBtn', _this.isRandom)
                    returnBtnIcon.classList.remove('activeBtn')    
                    if (_this.isRandom) {
                        nextBtn.onclick = randomSong
                        previousBtn.onclick = randomSong
                        audio.onended = randomSong
                    } 
                    if (!_this.isRandom && !_this.isReturn) {
                        nextBtn.onclick = app.nextSong
                        previousBtn.onclick = previousSong
                        audio.onended = app.nextSong
                    }
                }

                // xử lý khi click vào bài hát
                listSong.onclick = function(e) {
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    const songNode = e.target.closest('.song:not(.activeSong)')
                    const optionNode =  e.target.closest('.moreInformation')
                    const img1Node = e.target.closest('.song.activeSong')
                    const imgNode = e.target.closest('.image')
                    if (imgNode && img1Node) {
                        clickPlay()
                    }
                    if (songNode || optionNode) {
                        if (songNode && !optionNode){
                            _this.removeActivePreviousSong(currentSong,currentSongWave)
                            const songIndexByClick = Number(songNode.dataset.id)
                            _this.currentIndex = songIndexByClick
                            app.totalPlayMusicFunction()
                        }
                        if (optionNode) {
                            alert('you just click the option icon')
                        }
                    }
                }

    },
    settingStartReturn: function (){
       if(app.isReturn){

            app.isReturn = app.isReturn
            app.isRandom = false
           
            app.setConfig('isReturn', app.isReturn); 
            app.setConfig('isRandom', app.isRandom); 
            // returnBtnIcon.classList.toggle('activeBtn',app.isReturn) 
            // randomBtnIcon.classList.remove('activeBtn') 
            // if (!app.isReturn && !app.isRandom) {
            //     audio.onended = function() {
            //         nextSong() 
            //     } 
            //     // nextBtn.onclick = app.nextSong
            //     // previousBtn.onclick = previousSong    
            // } 
            // if (!app.isReturn &&app.isRandom) {
            //     nextBtn.onclick = randomSong
            //     previousBtn.onclick = randomSong
            // }
            if (app.isReturn) {
                audio.onended = function() {
                    audio.play() 
                } 
                // nextBtn.onclick = app.nextSong
                // previousBtn.onclick = previousSong  
            }
       }
        
    },
    settingStartRandom: function (){
        function randomSong() {
            const currentSong = $('[data-id="'+app.currentIndex+'"]')
            const currentSongWave = $('[data-id="'+app.currentIndex+'"] .wave')
            app.removeActivePreviousSong(currentSong,currentSongWave)
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * app.songs.length)
            } while(newIndex ==app.currentIndex)
            app.currentIndex = newIndex
            app.totalPlayMusicFunction()               
        }
        if(app.isRandom ){
    
            app.isRandom = app.isRandom
            app.isReturn = false
            app.setConfig('isRandom', app.isRandom); 
            app.setConfig('isReturn', app.isReturn); 
               
            // randomBtnIcon.classList.toggle('activeBtn', app.isRandom)
            // returnBtnIcon.classList.remove('activeBtn')    
            nextBtn.onclick = randomSong
            previousBtn.onclick = randomSong
            audio.onended = randomSong
            
            // if (!app.isRandom && !app.isReturn) {
            //     nextBtn.onclick = app.nextSong
            //     previousBtn.onclick = previousSong
            //     audio.onended = app.nextSong
            // }
        }
    },
    start: function() {
        // gán cấu hình từ config
        this.loadConfig();      
        this.renderPlayList()  // render playlist bài hát
        this.defindeProperties()  // định nghĩa các thuộc tính cho object
        this.handleEvent() // lắng nghe và xử lý các sự kiện
        this.loadCurrentSong()  // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.timeUpdate()  // update thời gian của bài hát
        this.addActiveCurrentSong()   // thêm activeSong ngay cho bài hát đầu tiên khi load lại trang
        this.switchBtn()  // nút đổi giao diện

        if(app.isRandom){
            randomBtnIcon.classList.toggle('activeBtn', app.isRandom)
            returnBtn.classList.remove('activeBtn')
        }
        if(app.isReturn){
            returnBtnIcon.classList.toggle('activeBtn', app.isReturn)
            randomBtnIcon.classList.remove('activeBtn');
        }

        app.settingStartReturn()
        app.settingStartRandom()
    }
}




app.start()