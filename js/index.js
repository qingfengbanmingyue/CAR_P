template.defaults.imports.dateFormat = function (date, format) {
    var data = new Date(date)

    var y = data.getFullYear()
    var M = data.getMonth() + 1
    var D = data.getDate()

    var h = data.getHours()
    if (h < 10) {
        h = "0" + h
    }
    if (m < 10) {
        m = "0" + m
    }
    var m = data.getMinutes()

    var s = data.getSeconds()
    if (s < 10) {
        s = "0" + s
    }
    return y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
template.defaults.imports.dateFormatUp = function (date, format) {

    var data = new Date(date)

    var y = data.getFullYear()
    var M = data.getMonth() + 1
    var D = data.getDate()

    var h = data.getHours()
    if (h < 10) {
        h = "0" + h
    }
    var m = data.getMinutes()
    if (m < 10) {
        m = "0" + m
    }

    var s = data.getSeconds()
    if (s < 10) {
        s = "0" + s
    }
    return y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

template.defaults.imports.img = function (str) {

    if (str) {
        
        return str.car_img

    }
  
}


$(function () {


    $.get("http://1.14.68.137:8000/api/v0/owner/", function (res) {

        console.log(res)
        let result = template("tpl-owin", res.results)

        $("tbody").html(result)


//新增

        $(".btn-xincreate").click(function () {

            $(".create_big").show()

        })
        $(".btn_Exit").click(function () {
            $(".create_big").hide()

        })



        $(".btn_Create").click(function () {
            if ($(".post_Parkstate").val() == "已停") {
                $(".post_Parkstate").val(1)
            } else if ($(".post_Parkstate").val() == "未停") {
                $(".post_Parkstate").val(0)
            }


            $.ajax({
                type: "POST",
                url: "http://1.14.68.137:8000/api/v0/owner/",

                data: {
                    name: $(".post_name").val(),
                    home_number: $(".post_Homenumber").val(),
                    phone_number: $(".post_Phonenumber").val(),
                    park_lot: $(".post_Parklot").val(),
                    park_state: $(".post_Parkstate").val()
                },
                success(res) {


                    alert("添加成功")
                    location.reload(true)
                    $(".create_big").hide()
                    console.log(res)

                },
                error() {

                    alert('添加失败,请联系客服')
                }
            })


        })

         //分页
        var resCount=Math.ceil(res.count/10)
        var date = { page: 1 }
        $('.table_view_left').click(function (){
            if(date.page==1){
                date.page=1
            }else if(date.page>1){
                date.page--
            }

            $.get('http://1.14.68.137:8000/api/v0/owner/',date,function (res){
                let result = template("tpl-owin", res.results)
                $('.fy_left').html(date.page)
                $("tbody").html(result)
                $(".btn-Update").each(function (index, item) {

                    item.dataset.index = res.results[index].id;


                    $(item).click(function () {
                        let UpdateID = this.dataset.index

                        $($(".Update_Div")).eq(index).show()
                        $(".btn_Uexit").eq(index).click(function () {
                            $($(".Update_Div")).eq(index).hide()

                        })

                        $('.btn_Uptitle').eq(index).click(function () {


                            if ($(".post_Parkstate").val() == "已停") {
                                $(".post_Parkstate").val(1)
                            } else if ($(".post_Parkstate").val() == "未停") {
                                $(".post_Parkstate").val(0)
                            }

                            $.ajax({
                                type: "PUT",
                                url: "http://1.14.68.137:8000/api/v0/owner/" + UpdateID + '/',


                                data: {
                                    name: $(".update_name").eq(index).val(),
                                    home_number: $(".update_Homenumber").eq(index).val(),
                                    phone_number: $(".update_Phonenumber").eq(index).val(),
                                    park_lot: $(".update_Parklot").eq(index).val(),
                                    park_state: $(".post_Parkstate").val()
                                },

                                success(res) {

                                    alert("更新成功")

                                    location.reload(true)
                                },
                                error(res) {
                                    console.log("更新失败" + res)
                                }


                            })


                        })

                    })
                })
                $(".fxk").each(function (index, item) {

                    $(this).click(function () {

                        if ($('.fxk')[index].checked) {


                            $(".btn-danger").each(function (index, item) {

                                item.dataset.index = res.results[index].id;

                                $(item).click(function () {

                                    let DeletID = this.dataset.index

                                    $($(".btn_danger_big")).eq(index).show()
                                    $(".exit_btn").eq(index).click(function () {
                                        $($(".btn_danger_big")).eq(index).hide()

                                    })
                                    $(".xtts_img").eq(index).click(function () {
                                        $($(".btn_danger_big")).eq(index).hide()

                                    })
                                    $('.delete_btn').eq(index).click(function () {
                                        $.ajax({
                                            type: "DELETE",
                                            url: "http://1.14.68.137:8000/api/v0/owner/" + DeletID + "/",
                                            success(res) {

                                                alert("删除成功")
                                                location.reload(true)
                                            }

                                        })
                                    })


                                })

                            })


                        }
                    })


                })


                $('.btn-info').each(function (index,item){
                    item.dataset.index = res.results[index].id;
                    var qqindex=index
                    $(item).click(function (){
    
                        $($(".car_big")).eq(index).show()
                        $('.car_down').eq(index).click(function (){
                            $($(".car_big")).eq(index).hide()
                            $($(".car_license")).eq(index).html('')
                        })
    
                        let a=''
                        if(res.results[index].carlist.length==0){
                            a='您还没放车呢'
                            $('.car_license').eq(index).html(a)
                        }else{
                           
    
                            $(res.results[index].carlist).each(function (index,item){
                                $('.car_license').eq(qqindex).append($('<div class="delete_Cartitle car_view">' + item.license + '</div>'))
    
                            })
                           
                        }
    
                    })
    
    
                    $('.car_Create').eq(index).click(function (){
                        $('.car_small').show()
                        $('.car_cre').show()
                        $('.cre_hide').click(function(){
                            $('.car_cre').hide()
                            $('.shuru').hide()
                        } )
                        $(".ipt_one").focus().css({ border: " 1px solid #36c777"})
                        $('.shuru').css({display: 'flex'})
    
                        $(".srk").click(function (e){
    
    
                            // console.log($($(".iptDiv>input").eq(index)))
                            for(let i=0;i<$(".iptDiv>input").length;i++){
                                // console.log($($(".iptDiv>input"))[i])
    
                                if(!$(".iptDiv>input")[i].value){
    
                                    $(".iptDiv>input")[i].value=e.target.innerHTML
    
                                    $($(".iptDiv>input")[i]).css({border: " 1px solid #eee"})
                                    $($(".iptDiv>input")[i+1]).focus().css({
                                        border: " 1px solid #36c777",
    
                                    })
                                    if(!i){
                                        $('.shuru').hide().siblings().css({display:'flex'})
                                    }
                                    return
    
    
                                }
                                if(i==5){
                                    $('.srk').hide()
    
                                }
                            }
                        })
    
                        $('.file_big').click(function (){
                           
                            car_file.addEventListener('change',function (){
                                let reader=new FileReader()
                                console.log(reader)
                                reader.onload=function (e) {
    
    
    
                                    var img=new Image()
                                    img.setAttribute('class','file_imgg')
                                    img.src = e.target.result;
    
    
    
                                    // console.log(e.target.result)
                                    $('.file_big').append(img)
    
                                    $('.center_bottom').click(function (){
    
    
    
                                        var a=''
                                        $('.iptDiv>input').each(function (index,item){
                                            a+=$(item).val()
                                        })
    
    
                                        let img_car=new FormData()
                                        var car_img=$('.car_file')[0].files[0]
    
                                        img_car.append('license',a)
                                        img_car.append('car_img',car_img)
                                        img_car.append('owner', item.dataset.index)
    
                                        console.log(a);
                                        console.log(car_img);
                                        console.log(item.dataset.index);
                                        console.log(img_car)
                                        $.ajax({
                                            type:'POST',
                                            url: 'http://1.14.68.137:8000/api/v0/license/',
                                            contentType: false,
                                            processData:false,
                                            data:img_car,
                                            success(res){
                                                alert('添加成功')
                                                $('.car_small').show()
                                                $('.car_cre').hide()
                                                location.reload()
    
                                            },
                                            error(){
                                                alert('添加失败')
                                                $('.car_small').show()
                                                $('.car_cre').hide()
                                            }
                                        })
    
    
                                    })
                                }
    
                                reader.readAsDataURL($('.car_file')[0].files[0])
    
    
    
    
                            })
    
    
                        })
    
    
    
    
                    })
                    $('.car_Update').eq(index).click(function (){
    
                        $('.car_update_big').show()
    
    
    
                        if(res.results[index].carlist.length!==0){
                            var abcitem=item.dataset.index
                            $('.car_update_small').hide()
    
                            $('.car_updateli').show()
                            $('.car_update_big').show()
                            $('.uphidecar').click(function (){
                                $('.car_updateli').hide()
                                $('.car_update_big').hide()
                            })
                            $(res.results[index].carlist).each(function (index,item){
    
                                $('.car_title_new').append($('<div class="update_cartitle">' + item.license + '</div>'))
    
                                $('.update_cartitle').eq(index).attr('up_index',item.id)
                                console.log($('.update_cartitle').eq(index).attr('up_index'))
                                $('.update_cartitle').eq(index).click(function (){
                                    $(".ipt_toneup").focus().css({ border: " 1px solid #36c777"})
                                    var updatecar=$(this).attr('up_index')
                                    $('.car_updateli').hide()
                                    $('.car_update_small').show()
    
    
                                    $('.shuru').css({display: 'flex'})
                                    $(".srk").click(function (e){
    
    
                                        // console.log($($(".iptDiv>input").eq(index)))
                                        for(let i=0;i<$(".iptDivU>input").length;i++){
                                            // console.log($($(".iptDiv>input"))[i])
    
                                            if(!$(".iptDivU>input")[i].value){
    
                                                $(".iptDivU>input")[i].value=e.target.innerHTML
    
                                                $($(".iptDivU>input")[i]).css({border: " 1px solid #eee"})
                                                $($(".iptDivU>input")[i+1]).focus().css({
                                                    border: " 1px solid #36c777",
    
                                                })
                                                if(!i){
                                                    $('.shuru').hide().siblings().css({display:'flex'})
                                                }
                                                return
    
    
                                            }
                                            if(i==5){
                                                $('.srk').hide()
    
                                            }
                                        }
                                    })
    
                                    $('.file_big').click(function (){
                                       
                                        car_upfile.addEventListener('change',function (){
                                            let reader=new FileReader()
                                            console.log(reader)
                                            reader.onload=function (e) {
    
    
    
                                                var img=new Image()
                                                img.setAttribute('class','file_imgg')
                                                img.src = e.target.result;
    
    
    
                                                // console.log(e.target.result)
                                                $('.file_big').append(img)
    
                                                $('.center_bottomUpt').click(function (){
    
    
    
                                                    var a=''
                                                    $('.iptDivU>input').each(function (index,item){
                                                        a+=$(item).val()
                                                    })
    
    
                                                    let img_car=new FormData()
                                                    var car_img=$('.car_fileup')[0].files[0]
    
                                                    img_car.append('license',a)
                                                    img_car.append('car_img',car_img)
                                                    img_car.append('owner', abcitem)
    
                                                    console.log(a);
                                                    console.log(car_img);
                                                    console.log(abcitem);
                                                    console.log(img_car)
                                                    $.ajax({
                                                        type:'PUT',
                                                        url: 'http://1.14.68.137:8000/api/v0/license/'+updatecar+'/',
                                                        contentType: false,
                                                        processData:false,
                                                        data:img_car,
                                                        success(res){
                                                            alert('更新成功')
                                                            $('.car_small').show()
                                                            $('.car_cre').hide()
                                                            location.reload()
    
                                                        },
                                                        error(){
                                                            alert('更新失败')
                                                            $('.car_small').show()
                                                            $('.car_cre').hide()
                                                        }
                                                    })
    
    
                                                })
                                            }
    
                                            reader.readAsDataURL($('.car_fileup')[0].files[0])
    
    
    
    
                                        })
                                    })
    
    
    
    
    
                                })
                            })
    
                            console.log(index)
    
    
    
                            $('.uphidecar').click(function (){
    
                                $('.car_update_big').hide()
                                $('.car_title_new').html('')
                            })
                            $('.updatehide').click(function (){
                                $('.car_update_small').hide()
                                $('.shuru').hide()
                                $('.car_updateli').show()
    
                            })
    
                        }else{
                            alert('您没有车辆,请您添加车辆')
                            $('.car_update_big').hide()
                            $('.shuru').hide()
                        }
    
    
                    })
    
    
    
    
    
    
    
    
    
    
                    $('.car_Delete').eq(index).click(function (){
                        $('.car_delete_big').show()
                        $('.car_deletehide').click(function (){
                            $('.car_delete_big').hide()
                            $('.car_deltitle').html('')
                        })
                        console.log(res.results[index].carlist.length)
                        if(res.results[index].carlist.length!==0){
    
    
    
                            $(res.results[index].carlist).each(function (index,item){
    
                                $('.car_deltitle').append($('<div class="delete_Cartitle">' + item.license + '</div>'))
                                console.log(item.id)
                                $('.car_deltitle').attr('index',item.id)
                            })
    
                            $('.delete_Cartitle').click(function () {
                                $.ajax({
                                    type: 'DELETE',
                                    url: "http://1.14.68.137:8000/api/v0/license/" + $('.car_deltitle').attr('index')+ '/',
                                    success(res) {
                                        alert('删除成功')
    
                                        $('.car_delete_big').hide()
                                        location.reload()
                                    },
                                    error() {
                                        alert('删除失败')
                                    }
                                })
                            })
                        }else {
    
                            alert('您没有车辆,请您添加车辆')
    
                            $('.car_delete_big').hide()
    
    
    
                        }
    
                    })
    
                })

            })

        })

        $('.table_view_right').click(function (){
            date.page++
            if(date.page>=resCount){
                date.page=resCount
                $('.fy_left').html(date.page)
            }
            $.get('http://1.14.68.137:8000/api/v0/owner/',date,function (res){
                let result = template("tpl-owin", res.results)
                $('.fy_left').html(date.page)
                $("tbody").html(result)
                $(".btn-Update").each(function (index, item) {

                    item.dataset.index = res.results[index].id;


                    $(item).click(function () {
                        let UpdateID = this.dataset.index

                        $($(".Update_Div")).eq(index).show()
                        $(".btn_Uexit").eq(index).click(function () {
                            $($(".Update_Div")).eq(index).hide()

                        })

                        $('.btn_Uptitle').eq(index).click(function () {


                            if ($(".post_Parkstate").val() == "已停") {
                                $(".post_Parkstate").val(1)
                            } else if ($(".post_Parkstate").val() == "未停") {
                                $(".post_Parkstate").val(0)
                            }

                            $.ajax({
                                type: "PUT",
                                url: "http://1.14.68.137:8000/api/v0/owner/" + UpdateID + '/',


                                data: {
                                    name: $(".update_name").eq(index).val(),
                                    home_number: $(".update_Homenumber").eq(index).val(),
                                    phone_number: $(".update_Phonenumber").eq(index).val(),
                                    park_lot: $(".update_Parklot").eq(index).val(),
                                    park_state: $(".post_Parkstate").val()
                                },

                                success(res) {

                                    alert("更新成功")

                                    location.reload()
                                },
                                error(res) {
                                    console.log("更新失败" + res)
                                }


                            })


                        })

                    })
                })
                $(".fxk").each(function (index, item) {

                    $(this).click(function () {

                        if ($('.fxk')[index].checked) {


                            $(".btn-danger").each(function (index, item) {

                                item.dataset.index = res.results[index].id;

                                $(item).click(function () {

                                    let DeletID = this.dataset.index

                                    $($(".btn_danger_big")).eq(index).show()
                                    $(".exit_btn").eq(index).click(function () {
                                        $($(".btn_danger_big")).eq(index).hide()

                                    })
                                    $(".xtts_img").eq(index).click(function () {
                                        $($(".btn_danger_big")).eq(index).hide()

                                    })
                                    $('.delete_btn').eq(index).click(function () {
                                        $.ajax({
                                            type: "DELETE",
                                            url: "http://1.14.68.137:8000/api/v0/owner/" + DeletID + "/",
                                            success(res) {

                                                alert("删除成功")
                                                location.reload(true)
                                            }

                                        })
                                    })


                                })

                            })


                        }
                    })


                })


                $('.btn-info').each(function (index,item){
                    item.dataset.index = res.results[index].id;
                    var qqindex=index
                    $(item).click(function (){
    
                        $($(".car_big")).eq(index).show()
                        $('.car_down').eq(index).click(function (){
                            $($(".car_big")).eq(index).hide()
                            $($(".car_license")).eq(index).html('')
                        })
    
                        let a=''
                        if(res.results[index].carlist.length==0){
                            a='您还没放车呢'
                            $('.car_license').eq(index).html(a)
                        }else{
                           
    
                            $(res.results[index].carlist).each(function (index,item){
                                $('.car_license').eq(qqindex).append($('<div class="delete_Cartitle car_view">' + item.license + '</div>'))
    
                            })
                           
                        }
    
                    })
    
    
                    $('.car_Create').eq(index).click(function (){
                        $('.car_small').show()
                        $('.car_cre').show()
                        $('.cre_hide').click(function(){
                            $('.car_cre').hide()
                            $('.shuru').hide()
                        } )
                        $(".ipt_one").focus().css({ border: " 1px solid #36c777"})
                        $('.shuru').css({display: 'flex'})
    
                        $(".srk").click(function (e){
    
    
                            // console.log($($(".iptDiv>input").eq(index)))
                            for(let i=0;i<$(".iptDiv>input").length;i++){
                                // console.log($($(".iptDiv>input"))[i])
    
                                if(!$(".iptDiv>input")[i].value){
    
                                    $(".iptDiv>input")[i].value=e.target.innerHTML
    
                                    $($(".iptDiv>input")[i]).css({border: " 1px solid #eee"})
                                    $($(".iptDiv>input")[i+1]).focus().css({
                                        border: " 1px solid #36c777",
    
                                    })
                                    if(!i){
                                        $('.shuru').hide().siblings().css({display:'flex'})
                                    }
                                    return
    
    
                                }
                                if(i==5){
                                    $('.srk').hide()
    
                                }
                            }
                        })
    
                        $('.file_big').click(function (){
                           
                            car_file.addEventListener('change',function (){
                                let reader=new FileReader()
                                console.log(reader)
                                reader.onload=function (e) {
    
    
    
                                    var img=new Image()
                                    img.setAttribute('class','file_imgg')
                                    img.src = e.target.result;
    
    
    
                                    // console.log(e.target.result)
                                    $('.file_big').append(img)
    
                                    $('.center_bottom').click(function (){
    
    
    
                                        var a=''
                                        $('.iptDiv>input').each(function (index,item){
                                            a+=$(item).val()
                                        })
    
    
                                        let img_car=new FormData()
                                        var car_img=$('.car_file')[0].files[0]
    
                                        img_car.append('license',a)
                                        img_car.append('car_img',car_img)
                                        img_car.append('owner', item.dataset.index)
    
                                        console.log(a);
                                        console.log(car_img);
                                        console.log(item.dataset.index);
                                        console.log(img_car)
                                        $.ajax({
                                            type:'POST',
                                            url: 'http://1.14.68.137:8000/api/v0/license/',
                                            contentType: false,
                                            processData:false,
                                            data:img_car,
                                            success(res){
                                                alert('添加成功')
                                                $('.car_small').show()
                                                $('.car_cre').hide()
                                                location.reload()
    
                                            },
                                            error(){
                                                alert('添加失败')
                                                $('.car_small').show()
                                                $('.car_cre').hide()
                                            }
                                        })
    
    
                                    })
                                }
    
                                reader.readAsDataURL($('.car_file')[0].files[0])
    
    
    
    
                            })
    
    
                        })
    
    
    
    
                    })
                    $('.car_Update').eq(index).click(function (){
    
                        $('.car_update_big').show()
    
    
    
                        if(res.results[index].carlist.length!==0){
                            var abcitem=item.dataset.index
                            $('.car_update_small').hide()
    
                            $('.car_updateli').show()
                            $('.car_update_big').show()
                            $('.uphidecar').click(function (){
                                $('.car_updateli').hide()
                                $('.car_update_big').hide()
                            })
                            $(res.results[index].carlist).each(function (index,item){
    
                                $('.car_title_new').append($('<div class="update_cartitle">' + item.license + '</div>'))
    
                                $('.update_cartitle').eq(index).attr('up_index',item.id)
                                console.log($('.update_cartitle').eq(index).attr('up_index'))
                                $('.update_cartitle').eq(index).click(function (){
                                    $(".ipt_toneup").focus().css({ border: " 1px solid #36c777"})
                                    var updatecar=$(this).attr('up_index')
                                    $('.car_updateli').hide()
                                    $('.car_update_small').show()
    
    
                                    $('.shuru').css({display: 'flex'})
                                    $(".srk").click(function (e){
    
    
                                        // console.log($($(".iptDiv>input").eq(index)))
                                        for(let i=0;i<$(".iptDivU>input").length;i++){
                                            // console.log($($(".iptDiv>input"))[i])
    
                                            if(!$(".iptDivU>input")[i].value){
    
                                                $(".iptDivU>input")[i].value=e.target.innerHTML
    
                                                $($(".iptDivU>input")[i]).css({border: " 1px solid #eee"})
                                                $($(".iptDivU>input")[i+1]).focus().css({
                                                    border: " 1px solid #36c777",
    
                                                })
                                                if(!i){
                                                    $('.shuru').hide().siblings().css({display:'flex'})
                                                }
                                                return
    
    
                                            }
                                            if(i==5){
                                                $('.srk').hide()
    
                                            }
                                        }
                                    })
    
                                    $('.file_big').click(function (){
                                       
                                        car_upfile.addEventListener('change',function (){
                                            let reader=new FileReader()
                                            console.log(reader)
                                            reader.onload=function (e) {
    
    
    
                                                var img=new Image()
                                                img.setAttribute('class','file_imgg')
                                                img.src = e.target.result;
    
    
    
                                                // console.log(e.target.result)
                                                $('.file_big').append(img)
    
                                                $('.center_bottomUpt').click(function (){
    
    
    
                                                    var a=''
                                                    $('.iptDivU>input').each(function (index,item){
                                                        a+=$(item).val()
                                                    })
    
    
                                                    let img_car=new FormData()
                                                    var car_img=$('.car_fileup')[0].files[0]
    
                                                    img_car.append('license',a)
                                                    img_car.append('car_img',car_img)
                                                    img_car.append('owner', abcitem)
    
                                                    console.log(a);
                                                    console.log(car_img);
                                                    console.log(abcitem);
                                                    console.log(img_car)
                                                    $.ajax({
                                                        type:'PUT',
                                                        url: 'http://1.14.68.137:8000/api/v0/license/'+updatecar+'/',
                                                        contentType: false,
                                                        processData:false,
                                                        data:img_car,
                                                        success(res){
                                                            alert('更新成功')
                                                            $('.car_small').show()
                                                            $('.car_cre').hide()
                                                            location.reload()
    
                                                        },
                                                        error(){
                                                            alert('更新失败')
                                                            $('.car_small').show()
                                                            $('.car_cre').hide()
                                                        }
                                                    })
    
    
                                                })
                                            }
    
                                            reader.readAsDataURL($('.car_fileup')[0].files[0])
    
    
    
    
                                        })
                                    })
    
    
    
    
    
                                })
                            })
    
                            console.log(index)
    
    
    
                            $('.uphidecar').click(function (){
    
                                $('.car_update_big').hide()
                                $('.car_title_new').html('')
                            })
                            $('.updatehide').click(function (){
                                $('.car_update_small').hide()
                                $('.shuru').hide()
                                $('.car_updateli').show()
    
                            })
    
                        }else{
                            alert('您没有车辆,请您添加车辆')
                            $('.car_update_big').hide()
                            $('.shuru').hide()
                        }
    
    
                    })
    
    
    
    
    
    
    
    
    
    
                    $('.car_Delete').eq(index).click(function (){
                        $('.car_delete_big').show()
                        $('.car_deletehide').click(function (){
                            $('.car_delete_big').hide()
                            $('.car_deltitle').html('')
                        })
                        console.log(res.results[index].carlist.length)
                        if(res.results[index].carlist.length!==0){
    
    
    
                            $(res.results[index].carlist).each(function (index,item){
    
                                $('.car_deltitle').append($('<div class="delete_Cartitle">' + item.license + '</div>'))
                                console.log(item.id)
                                $('.car_deltitle').attr('index',item.id)
                            })
    
                            $('.delete_Cartitle').click(function () {
                                $.ajax({
                                    type: 'DELETE',
                                    url: "http://1.14.68.137:8000/api/v0/license/" + $('.car_deltitle').attr('index')+ '/',
                                    success(res) {
                                        alert('删除成功')
    
                                        $('.car_delete_big').hide()
                                        location.reload()
                                    },
                                    error() {
                                        alert('删除失败')
                                    }
                                })
                            })
                        }else {
    
                            alert('您没有车辆,请您添加车辆')
    
                            $('.car_delete_big').hide()
    
    
    
                        }
    
                    })
    
                })
            })


        })
        $.get('http://1.14.68.137:8000/api/v0/owner/',function (res){
            let result = template("tpl-owin", res.results)

            $('.fy_right').html(resCount)
            $("tbody").html(result)
            $(".btn-Update").each(function (index, item) {

                item.dataset.index = res.results[index].id;


                $(item).click(function () {
                    let UpdateID = this.dataset.index

                    $($(".Update_Div")).eq(index).show()
                    $(".btn_Uexit").eq(index).click(function () {
                        $($(".Update_Div")).eq(index).hide()

                    })

                    $('.btn_Uptitle').eq(index).click(function () {


                        if ($(".post_Parkstate").val() == "已停") {
                            $(".post_Parkstate").val(1)
                        } else if ($(".post_Parkstate").val() == "未停") {
                            $(".post_Parkstate").val(0)
                        }

                        $.ajax({
                            type: "PUT",
                            url: "http://1.14.68.137:8000/api/v0/owner/" + UpdateID + '/',


                            data: {
                                name: $(".update_name").eq(index).val(),
                                home_number: $(".update_Homenumber").eq(index).val(),
                                phone_number: $(".update_Phonenumber").eq(index).val(),
                                park_lot: $(".update_Parklot").eq(index).val(),
                                park_state: $(".post_Parkstate").val()
                            },

                            success(res) {

                                alert("更新成功")

                                location.reload()
                            },
                            error(res) {
                                console.log("更新失败" + res)
                            }


                        })


                    })

                })
            })
            $(".fxk").each(function (index, item) {

                $(this).click(function () {

                    if ($('.fxk')[index].checked) {


                        $(".btn-danger").each(function (index, item) {

                            item.dataset.index = res.results[index].id;

                            $(item).click(function () {

                                let DeletID = this.dataset.index

                                $($(".btn_danger_big")).eq(index).show()
                                $(".exit_btn").eq(index).click(function () {
                                    $($(".btn_danger_big")).eq(index).hide()

                                })
                                $(".xtts_img").eq(index).click(function () {
                                    $($(".btn_danger_big")).eq(index).hide()

                                })
                                $('.delete_btn').eq(index).click(function () {
                                    $.ajax({
                                        type: "DELETE",
                                        url: "http://1.14.68.137:8000/api/v0/owner/" + DeletID + "/",
                                        success(res) {

                                            alert("删除成功")
                                            location.reload(true)
                                        }

                                    })
                                })


                            })

                        })


                    }
                })


            })


            $('.btn-info').each(function (index,item){
                item.dataset.index = res.results[index].id;
                var qqindex=index
                $(item).click(function (){

                    $($(".car_big")).eq(index).show()
                    $('.car_down').eq(index).click(function (){
                        $($(".car_big")).eq(index).hide()
                        $($(".car_license")).eq(index).html('')
                    })

                    let a=''
                    if(res.results[index].carlist.length==0){
                        a='您还没放车呢'
                        $('.car_license').eq(index).html(a)
                    }else{
                       

                        $(res.results[index].carlist).each(function (index,item){
                            $('.car_license').eq(qqindex).append($('<div class="delete_Cartitle car_view">' + item.license + '</div>'))

                        })
                       
                    }

                })


                $('.car_Create').eq(index).click(function (){
                    $('.car_small').show()
                    $('.car_cre').show()
                    $('.cre_hide').click(function(){
                        $('.car_cre').hide()
                        $('.shuru').hide()
                    } )
                    $(".ipt_one").focus().css({ border: " 1px solid #36c777"})
                    $('.shuru').css({display: 'flex'})

                    $(".srk").click(function (e){


                        // console.log($($(".iptDiv>input").eq(index)))
                        for(let i=0;i<$(".iptDiv>input").length;i++){
                            // console.log($($(".iptDiv>input"))[i])
                         

                              


                             if(!$(".iptDiv>input")[i].value){
                         

                                $(".iptDiv>input")[i].value=e.target.innerHTML

                                $($(".iptDiv>input")[i]).css({border: " 1px solid #eee"})
                                $($(".iptDiv>input")[i+1]).focus().css({
                                    border: " 1px solid #36c777",

                                })
                                if(!i){
                                    $('.shuru').hide().siblings().css({display:'flex'})
                                }
                                return


                            }
                            if(i==5){
                                $('.srk').hide()

                            }
                        }
                        

                         })
                   

                    $('.file_big').click(function (){
                       
                        car_file.addEventListener('change',function (){
                            let reader=new FileReader()
                            console.log(reader)
                            reader.onload=function (e) {



                                var img=new Image()
                                img.setAttribute('class','file_imgg')
                                img.src = e.target.result;



                                // console.log(e.target.result)
                                $('.file_big').append(img)

                                $('.center_bottom').click(function (){



                                    var a=''
                                    $('.iptDiv>input').each(function (index,item){
                                        a+=$(item).val()
                                    })


                                    let img_car=new FormData()
                                    var car_img=$('.car_file')[0].files[0]

                                    img_car.append('license',a)
                                    img_car.append('car_img',car_img)
                                    img_car.append('owner', item.dataset.index)

                                    console.log(a);
                                    console.log(car_img);
                                    console.log(item.dataset.index);
                                    console.log(img_car)
                                    $.ajax({
                                        type:'POST',
                                        url: 'http://1.14.68.137:8000/api/v0/license/',
                                        contentType: false,
                                        processData:false,
                                        data:img_car,
                                        success(res){
                                            alert('添加成功')
                                            $('.car_small').show()
                                            $('.car_cre').hide()
                                            location.reload()

                                        },
                                        error(){
                                            alert('添加失败')
                                            $('.car_small').show()
                                            $('.car_cre').hide()
                                        }
                                    })


                                })
                            }

                            reader.readAsDataURL($('.car_file')[0].files[0])




                        })


                    })




                })
                $('.car_Update').eq(index).click(function (){

                    $('.car_update_big').show()



                    if(res.results[index].carlist.length!==0){
                        var abcitem=item.dataset.index
                        $('.car_update_small').hide()

                        $('.car_updateli').show()
                        $('.car_update_big').show()
                        $('.uphidecar').click(function (){
                            $('.car_updateli').hide()
                            $('.car_update_big').hide()
                        })
                        $(res.results[index].carlist).each(function (index,item){

                            $('.car_title_new').append($('<div class="update_cartitle">' + item.license + '</div>'))

                            $('.update_cartitle').eq(index).attr('up_index',item.id)
                            console.log($('.update_cartitle').eq(index).attr('up_index'))
                            $('.update_cartitle').eq(index).click(function (){
                                $(".ipt_toneup").focus().css({ border: " 1px solid #36c777"})
                                var updatecar=$(this).attr('up_index')
                                $('.car_updateli').hide()
                                $('.car_update_small').show()


                                $('.shuru').css({display: 'flex'})
                                $(".srk").click(function (e){


                                    // console.log($($(".iptDiv>input").eq(index)))
                                    for(let i=0;i<$(".iptDivU>input").length;i++){
                                        // console.log($($(".iptDiv>input"))[i])

                                        if(!$(".iptDivU>input")[i].value){

                                            $(".iptDivU>input")[i].value=e.target.innerHTML

                                            $($(".iptDivU>input")[i]).css({border: " 1px solid #eee"})
                                            $($(".iptDivU>input")[i+1]).focus().css({
                                                border: " 1px solid #36c777",

                                            })
                                            if(!i){
                                                $('.shuru').hide().siblings().css({display:'flex'})
                                            }
                                            return


                                        }
                                        if(i==5){
                                            $('.srk').hide()

                                        }
                                    }
                                })

                                $('.file_big').click(function (){
                                   
                                    car_upfile.addEventListener('change',function (){
                                        let reader=new FileReader()
                                        console.log(reader)
                                        reader.onload=function (e) {



                                            var img=new Image()
                                            img.setAttribute('class','file_imgg')
                                            img.src = e.target.result;



                                            // console.log(e.target.result)
                                            $('.file_big').append(img)

                                            $('.center_bottomUpt').click(function (){



                                                var a=''
                                                $('.iptDivU>input').each(function (index,item){
                                                    a+=$(item).val()
                                                })


                                                let img_car=new FormData()
                                                var car_img=$('.car_fileup')[0].files[0]

                                                img_car.append('license',a)
                                                img_car.append('car_img',car_img)
                                                img_car.append('owner', abcitem)

                                                console.log(a);
                                                console.log(car_img);
                                                console.log(abcitem);
                                                console.log(img_car)
                                                $.ajax({
                                                    type:'PUT',
                                                    url: 'http://1.14.68.137:8000/api/v0/license/'+updatecar+'/',
                                                    contentType: false,
                                                    processData:false,
                                                    data:img_car,
                                                    success(res){
                                                        alert('更新成功')
                                                        $('.car_small').show()
                                                        $('.car_cre').hide()
                                                        location.reload()

                                                    },
                                                    error(){
                                                        alert('更新失败')
                                                        $('.car_small').show()
                                                        $('.car_cre').hide()
                                                    }
                                                })


                                            })
                                        }

                                        reader.readAsDataURL($('.car_fileup')[0].files[0])




                                    })
                                })





                            })
                        })

                        console.log(index)



                        $('.uphidecar').click(function (){

                            $('.car_update_big').hide()
                            $('.car_title_new').html('')
                        })
                        $('.updatehide').click(function (){
                            $('.car_update_small').hide()
                            $('.shuru').hide()
                            $('.car_updateli').show()

                        })

                    }else{
                        alert('您没有车辆,请您添加车辆')
                        $('.car_update_big').hide()
                        $('.shuru').hide()
                    }


                })










                $('.car_Delete').eq(index).click(function (){
                    $('.car_delete_big').show()
                    $('.car_deletehide').click(function (){
                        $('.car_delete_big').hide()
                        $('.car_deltitle').html('')
                    })
                    console.log(res.results[index].carlist.length)
                    if(res.results[index].carlist.length!==0){



                        $(res.results[index].carlist).each(function (index,item){

                            $('.car_deltitle').append($('<div class="delete_Cartitle">' + item.license + '</div>'))
                            console.log(item.id)
                            $('.car_deltitle').attr('index',item.id)
                        })

                        $('.delete_Cartitle').click(function () {
                            $.ajax({
                                type: 'DELETE',
                                url: "http://1.14.68.137:8000/api/v0/license/" + $('.car_deltitle').attr('index')+ '/',
                                success(res) {
                                    alert('删除成功')

                                    $('.car_delete_big').hide()
                                    location.reload()
                                },
                                error() {
                                    alert('删除失败')
                                }
                            })
                        })
                    }else {

                        alert('您没有车辆,请您添加车辆')

                        $('.car_delete_big').hide()



                    }

                })

            })

        })


     //全选框复选框切换状态
        $('.qxk').change(function () {
            $('.fxk,.qxk').prop("checked", $(this).prop('checked'))

        })
        $('.fxk').change(function () {

            // 如果选中的长度等于复选框所有的长度

            if ($('.fxk:checked').length === $('.fxk').length) {
                $('.qxk').prop('checked', true)
            } else {
                $('.qxk').prop('checked', false)

            }

        })




    })








})

