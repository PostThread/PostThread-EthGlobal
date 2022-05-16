function getEventIndex(abi, event) {
    let event_index = 0
    let found = false
    abi.forEach(element => {
        if (element.name === event) {
            found = true
        }
        if (!found) event_index++
    });
    if (!found) event_index = -1
    return event_index
}

export function getFieldIndex(abi, event, field) {
    const event_index = getEventIndex(abi, event)
    // console.log(event_index)
    if (event_index !== -1) {
        let field_index = 0
        let found = false
        abi[event_index].inputs[0].components.forEach(component => {
            if (component.name === field) {
                found = true
            }
            if (!found) field_index++
        });
        if (!found) field_index = -1
        // console.log(abi[event_index].inputs[0].components)
        // console.log(field_index)
        return field_index
    }
}