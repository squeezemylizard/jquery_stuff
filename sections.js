 
$(document).ready(
    function() {
        var sections =     $("#Sections");                   /* return group element of sections */
        var num_sections = sections.length;                  /* return number of sections existing on the page */
        var max_sections = 4;                                /* max sections allowed per page */ 
        var add_sections_enabled = 1;                        /* button to add more sections */
        

        var remove_section = function(section_id){
            /*we always have at least 1 section, get the following sections */
            $(`#${section_id}`).remove()  /*remove the section from the container of sections*/
            --num_sections; /* decrement number of sections as deleted one */
            
            console.log('number of sections remaining :' + num_sections); 
        }

         var add_section = function(){
            console.log('number of sections:' + num_sections) 
            if (num_sections <  max_sections){
                console.log('entered loop add section')
                
                ++num_sections

                /*delete button id which links to section id*/
                var delete_section_str = `Btn_Delete_Container_Section_${num_sections}`
                
                /*section template */
                var section_template = `
                    <div class="container" id="Container_Section_${num_sections}"> 
                        <label for="section" id="Label_Section_${num_sections}">Section #${num_sections}: </label> 
                        <textarea class ="form-control section" placeholder="Enter Text" name="section"></textarea>
                        <form class="form-inline justify-content-center">
                            <button type ="button" class ="btn-danger" id="${delete_section_str}"><i class="fas fa-trash-alt fa-2x"></i></button> 
                        </form>
                    </div>
                `;

            
                sections.append(section_template);

                /*attach an event handler to the new delete button */
               /* $(`#${delete_section_str}`).click(On_Delete_Section) */
                $(`#${delete_section_str}`).on("click",On_Delete_Section);
               
                /* handle the button to stop more sections being added  */
                if (num_sections ==  max_sections){
                   
                    sections.append('<label id="max_sections" for="section">Max Sections reached  </label>')
                 
                    $("#add_section").addClass('disabled'); 
                    $("#add_section").off("click"); 
                    add_sections_enabled = 0;
                    if (!add_sections_enabled) { console.log(' turned off event click')};
               };  
            } 
              
        } 


        var On_Delete_Section = function(){
            button_id = $(this).attr('id'); /* fetch the button id */
            console.log('button ID :' + button_id)

            section_id = `${button_id}`.replace('Btn_Delete_','');  
            console.log('section ID :' + section_id)

            id = `${section_id}`.replace('Container_Section_','');
            console.log('section number :' + id);
 
            remove_section(section_id);
            
            var next_section = ++id;
            console.log('updating section' + (next_section));
             for (i = next_section; i <= num_sections+1; i++) {
                console.log('updating section' + i);
                
                console.log(`changing : #Container_Section_${i}`);
                $(`#Container_Section_${i}`).attr('id', `Container_Section_${i-1}`);
                $(`#Label_Section_${i}`).attr('id', `Label_Section_${i-1}`);
                $(`#Label_Section_${i-1}`).text(`Section #${i-1}:`);
                $(`#Btn_Delete_Container_Section_${i}`).attr('id',`Btn_Delete_Container_Section_${i-1}`);

            }
           
            $("#add_section").addClass('enabled'); 
            $('#max_sections').remove();  
            
            if (!add_sections_enabled){
                console.log('renenabling click event handler')
                $("#add_section").on("click",add_section);
                add_sections_enabled = 1;
            }
        };


         

        $("#add_section").on("click",add_section);

        
    }
);  
