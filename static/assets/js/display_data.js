function display(id,temp) {
    Breed = ['Boxer', 'Bulldog', 'Cocker', 'German Sheperd', 'Labrador', 'Maltese', 'Poodle', 'Pug']
    Found_at = ['Am', 'Am', 'Am', 'Am', 'Am', 'Am', 'Am', 'Am']
    height = [1, 2, 3, 4, 5, 6, 7, 8]
    weight = [1, 2, 3, 4, 5, 6, 7, 8]
    Age = [1, 2, 3, 4, 5, 6, 7, 8]
    Friendliness = ['Am', 'Am', 'Am', 'Am', 'Am', 'Am', 'Am', 'Am']
    other = ['Am', 'Am', 'Am', 'Am', 'Am', 'Am', 'Am', 'Am']

    //check whether previous predicted result is still there or not
    var element = document.querySelector('#edit');
    if (element) {
        element.remove();
    }
    // Create the main container element
    var container = document.createElement("div");
    container.id = "edit";
    container.className = "info";

    // Create the image element
    var image = document.createElement("img");
    image.className = "newinfoimage";
    image.src=temp;
    image.alt = "Something went wrong";

    // Create the data container element
    var dataContainer = document.createElement("div");
    dataContainer.className = "newinfodata";

    // Create the unordered list element
    var ul = document.createElement("ul");

    // Create an array of data items
    var dataItems = [
        { label: "Breed : ", value: Breed[id] },
        { label: "Found at : ", value: Found_at[id] },
        { label: "Height : ", value: height[id] },
        { label: "Weight : ", value: weight[id] },
        { label: "Age : ", value: Age[id] },
        { label: "Friendliness : ", value: Friendliness[id] },
        { label: "Other : ", value: other[id] }
    ];

    // Create list items for each data item
    dataItems.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "newinfodata1";
        li.innerHTML = "<b>" + item.label + "</b>" + item.value;
        ul.appendChild(li);
    });
    const btn = document.createElement('button');
    btn.innerHTML="Get more info";
    btn.id="details";
    // btn.onclick=get_details();
    // Append the elements to their respective parents
    dataContainer.appendChild(ul);
    dataContainer.appendChild(btn);
    container.appendChild(image);
    container.appendChild(dataContainer);
    // Append the main container to the document body
    document.body.appendChild(container);
}