$(function(){
    //next variable is global
    var setgameTime;

    var userName = prompt("Enter Your Name !"),
        levelGame = prompt("Enter Number of The Level !\n1.Easy\n2.Median\n3.Hard"),
        QTime = prompt("Would you like the game with time ?\n 1.Yes \n 2.No")
    
    //the level
    var level,
        numSeconds,
        gameTime;
    switch(levelGame){
        case '1':
            level = 10;
            numSeconds=2;
            break;
        case '2':
            level = 20;
            numSeconds=5;
            break;
        case '3':
            level = 30;
            numSeconds=10;
            break;
        default:
            level = 10;
            numSeconds=2;
    }
    switch(QTime){
        case '1':
            levelGame==1?gameTime=30:levelGame==2?gameTime=60:levelGame==3?gameTime=90:gameTime=30;
            break;
        case '2':
            gameTime = " ";
            break;
        default:
            gameTime = " ";
    }

    // create boxs of the game
    for(var i=0 ; i<level ; i++){ $(".startGame").prepend("<div class='choice'></div>") }
    $(".choice").prepend("<div class='back piece'></div>")
    $(".choice").prepend("<div class='front piece'><i class='fa fa-question'></i></div>")


    //make the overlay hidden
    $(".overlay button").click(function(){
        $(this).parent().fadeOut(1000,function(){

            //show photos some time
            $(".info .time").text(numSeconds)
            var time = setInterval(function(){
                $(".info .time").text( parseInt($(".info .time").text())-1 )

                //make time hidden and make photos rotate 180
                if( $(".info .time").text() == 0 ){ 
                    clearInterval(time);
                    $(".info .time").delay(250).fadeOut(100,function(){
                        $(".startGame .choice").css("transform","rotateY(0deg)");

                        // game time
                        if(QTime==1){
                            $(".info .time").fadeIn(500).text( gameTime );
                            setgameTime = setInterval(function(){
                                $(".info .time").text( parseInt($(".info .time").text())-1 )

                                // say and write game over if the time finished
                                if( $(".info .time").text() == 0 ){ 
                                    clearInterval(setgameTime);
                                    $(".lose").delay(1000).fadeIn(1000,function(){
                                        document.getElementById("gameOver").play();
                                        var gameOver = "Game Over!",
                                        i=0;
                                        var setlose = setInterval(function(){
                                            document.getElementsByClassName("saylose")[0].textContent += gameOver[i];
                                            i+=1;

                                            // stop write
                                            if(i==gameOver.length){
                                                clearInterval(setlose);
                                                $(".lose button").delay(500).fadeIn(750).click(function(){
                                                    location.reload()
                                                })
                                            }
                                        },200)
                                    })
                                }
                            },1000)
                        }else{
                            // make position of time emtpy if the user don't click 1
                            $(".info .time").text(" ");
                        }
                    })
                }
            },1000)
        })
    })

    // fill name
    if(userName !=""){$(".info .name").find("span").text(userName)}
   
    // fill images
    var card = $(".startGame .choice");
    var images=["images/img1.png","images/img2.png","images/img3.png","images/img4.png","images/img5.png","images/img6.png","images/img7.png","images/img8.png","images/img9.png","images/img10.png","images/img11.png","images/img12.png","images/img13.png","images/img14.png","images/img15.png"];

    var count1=0,
        randomChoice="";
    while( count1 < level/2 ){
        randomChoice = Math.floor(Math.random()*card.length);
        if(!card.eq(randomChoice).hasClass("full")){
            card.eq(randomChoice).addClass("full").find(".back").prepend("<img src="+images[count1]+">");
            count1++;
        }
    }
    var count2=0;
    while( count2 < level/2 ){
        randomChoice = Math.floor(Math.random()*card.length);
        if(!card.eq(randomChoice).hasClass("full")){
            card.eq(randomChoice).addClass("full").find(".back").prepend("<img src="+images[count2]+">");
            count2++;
        }
    }

    //Check and flip
    var countCheck=0,
        firstImage="",
        secondImage="";

    $(".startGame .choice").on("click",function(){
        if( !$(this).hasClass("flip") ){countCheck++;}

        $(this).addClass("flip");

        if(countCheck%2==0){secondImage = $(this).find("img").attr("src");}
        else{firstImage = $(this).find("img").attr("src");}
       
        if(countCheck%2==0){
            if(firstImage!=secondImage){
                $(".choice img[src='"+firstImage+"']").parent().parent().css("border","3px solid rgb(0, 132, 255)").delay(500).animate({
                    "transform":"0deg"
                },500,function(){
                    $(this).removeClass("flip");
                })

                $(".choice img[src='"+secondImage+"']").parent().parent().css("border","3px solid rgb(0, 132, 255)").delay(500).animate({
                    "transform":"0deg"  
                },500,function(){
                    $(this).removeClass("flip");
                })
                var wrong = parseInt( $(".info .wrongTime span").text() );
                $(".info .wrongTime span").text( wrong+=1 );
                document.getElementById("fail").play();
            }else{
                $(".choice img[src='"+firstImage+"']").parent().parent().css("border","3px solid rgb(67, 72, 76)");
                document.getElementById("successful").play();
            }
        }

        //check you complete or no 
        if( $(".flip").length == level ){
            clearInterval(setgameTime);
            $(".con").delay(1000).fadeIn(1000,function(){
                document.getElementById("con").play();
                var congra = "congratulations!",
                i=0;
                var setcon = setInterval(function(){
                    document.getElementsByClassName("sayCon")[0].textContent += congra[i];
                    i+=1;
                    if(i==congra.length){
                        clearInterval(setcon);
                        $(".con button").delay(500).fadeIn(750).click(function(){
                            location.reload()
                        })
                    }
                },200)
            })
        }

    })
});