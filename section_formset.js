
/* for use with django inline formsets 
   I've removed the delete button, as I actually prefer the default behaviour of DJango 

*/  


$(document).ready(
    function() {
        
        function Form_Count() {
            return parseInt($('#id_section_set-TOTAL_FORMS').val());
        } 
     
        var Remove_Section = function(){
            current_form_count = Form_Count();

            button_id = $(this).attr('id'); /* fetch the button id */
            console.log('button ID :' + button_id)

            section_id = `${button_id}`.replace('btn_delete_','');  
            console.log('section ID :' + section_id);

            $(`#section_${section_id}`).remove();
              

            next_section = ++section_id;
            
            for(i=next_section; i < current_form_count; i++){
              
                update_section = $(`#section_${i}`);
                

            }
             
            if (next_section < current_form_count)
                {console.log('next section' + next_section);}
            
             
             
            $('#id_section_set-TOTAL_FORMS').val(--current_form_count);
        }
    
        var Add_Section = function(){
             
            
            current_form_count = Form_Count();
            
            btn_delete_id = `btn_delete_${current_form_count}`


            delete_btn =  `<button type="button" class="btn btn-danger ml-2"  id='${btn_delete_id}'>
                                    Delete Section : ${current_form_count+1}- yes I'm sure
                                </button>`
            
            new_form = $('#section_empty_form').clone().html();
            
            new_form = new_form.replaceAll('__prefix__',current_form_count); 

            section_id = `section_${current_form_count}`

            /*new_section = `<div id = ${section_id}>
                                ${new_form}
                                ${delete_btn}
                            </div>`  */
            new_section = `<div id = ${section_id}>
                                ${new_form}
                                
                            </div>`  
            
            
            $('#sections').append(new_section);
          /*  $(`#${btn_delete_id}`).on("click",Remove_Section); */
            $('#id_section_set-TOTAL_FORMS').val(++current_form_count);
            
        }

        $("#add_section").on("click",Add_Section );

       
    }
);  
