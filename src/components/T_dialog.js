import React from 'react'

class T_Dialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: props.open
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        })
    }

    closeDialog(e) {
        if (e.target.id == 'tao-dialog') {
            this.setState({
                open: false
            })
            if (this.props.closeFunc) {
                this.props.closeFunc()
            }
        }
    }

    render() {
        const open = this.state.open
        const styles = this.styles
        const body = this.props.children

        if (!open) {
            return <div style={{display: 'none'}}></div>
        } else {
            return (
                <div id='tao-dialog' style={styles.overAll} onClick={this.closeDialog.bind(this)}>
                    <div id='tao-dialogBody' style={styles.body}>
                        {body}
                    </div>
                </div>
            )
        }
    }

    styles = {
        overAll: {
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            width: '100%', height: '100%',
            position: 'fixed', top: '0px', left: '0px', right: '0px',
            background: 'rgba(144, 144, 144, 0.87)',
            backgroundImage:'repeating-linear-gradient(135deg, rgba(0,0,0,.3), rgba(0,0,0,.3) 1px, transparent 2px, transparent 2px, rgba(0,0,0,.3) 3px)',
            zIndex: '5',
            backgroundSize:'4px 4px'
        },
        body: {
            borderRadius:'5px',
            margin: '0 auto',
            width: '50%',
            padding: '25px',
            height: '100px',
            fontFamily: 'arial, 微軟正黑體',
            overflowY: 'auto',
            background: 'white',
            boxShadow: '0px 2px 10px 5px grey',
            position: 'relative'
        }
    }
}

T_Dialog.defaultProps = {
    open: false
}

export default T_Dialog
