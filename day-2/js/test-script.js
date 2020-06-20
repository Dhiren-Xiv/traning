var isTrue = false;
$(document).ready(() => {
    let getData = () => {
        return new Promise((resolve) => {
            setTimeout(()=>{
                 resolve(`<h1 class="border mt-2 p-3">
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure autem voluptates, illo repudiandae consectetur fugiat cumque aliquam accusamus quo. Debitis dolores vel inventore labore amet dolorum nostrum aspernatur praesentium repudiandae.
                 Veniam fugit officiis, magnam voluptate facilis provident temporibus nobis fugiat esse! Ea nulla, eveniet ex mollitia quae maxime aliquid voluptatibus fugiat voluptates sit amet consequatur molestias magni, a quia veritatis.
                 Iure, corporis? Consequuntur aut voluptatibus atque sit et eligendi. Architecto deserunt, dolorem animi natus aspernatur earum? Animi architecto tempora ipsa sint ut debitis, ipsum iste adipisci ullam accusamus. Eius, incidunt.
                 Delectus voluptatem dolores obcaecati deserunt minima autem officiis, blanditiis, necessitatibus saepe, voluptatibus laboriosam ipsa veritatis repudiandae ipsum illo fugiat. Cum distinctio nobis veniam architecto maxime nam ullam! Iure, ut aut.
                 Quaerat unde minima laudantium quam vero molestias nisi dolores explicabo expedita vel consequuntur quod obcaecati exercitationem amet, adipisci voluptate odit quis harum! Sapiente assumenda amet quibusdam fugiat commodi labore deleniti?
                 Quasi, quis expedita eius molestias commodi iusto ipsa. Quas voluptates velit nihil laboriosam soluta recusandae inventore sed qui. Ipsum minus, iusto architecto rerum qui corrupti totam expedita blanditiis fugit nostrum.
                 Quia nisi tenetur dicta beatae officiis at, quas provident perspiciatis maiores molestias sint velit non quod quae optio facere? Fugiat tempora dicta officia magnam modi deleniti quasi odit dolorem quisquam?
                 Obcaecati culpa possimus modi qui excepturi aperiam magnam unde impedit, rerum vero ut aliquid laboriosam doloribus incidunt voluptas, blanditiis quo laborum maiores harum accusantium! At cupiditate aspernatur cumque odit debitis?
                 Voluptas tempore, harum blanditiis expedita enim totam veritatis ipsum quisquam possimus dolor illo veniam laudantium eum animi similique facilis doloremque architecto, consectetur praesentium placeat laboriosam quae repellat sint! Quidem, asperiores.
                 Quasi dolosr illum quae nostrum nisi blanditiis dolorum aperiam labore. Eligendi voluptas autem fugit voluptatibus laboriosam sapiente! Rem ducimus excepturi nemo pariatur iure et, ipsa recusandae minima necessitatibus cum eius!
             </h1>`);
            },1000)
        })
    }
    $(window).bind('scroll', async (event) => {
        let contentHeight = $(".content-div").height();
        console.log('isTrue: ', isTrue);
        if(isTrue){
            event.preventDefault();
        } else {
            console.log('contentHeight: ', contentHeight);
            console.log('$(this)[0].scrollTop(): ', $(this).scrollTop() + $(window).height());
            if($(this).scrollTop() + $(window).height() >= contentHeight) {
                debugger;
                isTrue = true;
                let data = await getData() // ajax call.
                $(".content-div").append(data);
                isTrue = false;
            }
        }
    })
    $("#test").on('keydown', (event) => {
        if(isTrue){
            event.preventDefault();
        } else {
            setTimeout(() => {
                isTrue = true
                let test = $(event.currentTarget).val();
                console.log('test: ', test);
            },2000);
        }
        

    })
});