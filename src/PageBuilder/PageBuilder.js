import React, { useEffect } from 'react'
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs'
import './PageBuilder.css'
import dynamicConfig from './grapesjsConfig'



function PageBuilder() {

    const loadComponents = (editor) => {
        editor.BlockManager.add('blocks', {
            content: {
                tagName: 'div',
                draggable: true,
                attributes: { 'attrib': 'value' },
                component: [
                    {
                        tagName: 'span',
                        content: '<b>new content</b>'
                    },
                    {
                        tagName: 'div',
                        content: '<span>new content html at some point</span>'
                    }
                ]
            }
        })

        editor.Panels.addPanel({
            id: 'panel-top',
            el: '.panel__top',
        });

        editor.Panels.addPanel({
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
                {
                    id: 'visibility',
                    active: true, // active by default
                    className: 'btn-toggle-borders',
                    label: '<u>B</u>',
                    command: 'sw-visibility', // Built-in command
                }, {
                    id: 'export',
                    className: 'btn-open-export',
                    label: 'Exp',
                    command: 'export-template',
                    context: 'export-template', // For grouping context of buttons from the same panel
                }, {
                    id: 'show-json',
                    className: 'btn-show-json',
                    label: 'JSON',
                    context: 'show-json',
                    command(editor) {
                        editor.Modal.setTitle('Components JSON')
                            .setContent(`<textarea style="width:100%; height: 250px;">
                      ${JSON.stringify(editor.getComponents())}
                    </textarea>`)
                            .open();
                    },
                }
            ],
        });
    }


    const loadGrapesjs = async () => {
        const editor = await grapesjs.init(dynamicConfig())
        loadComponents(editor)
    }

    useEffect(() => {
        loadGrapesjs()
    }, [])

    return (
        <section id='pagebuilder'>
            <article>
                <div className="panel__top">
                    <div className="panel__basic-actions"></div>
                </div>
                <div className='editor-window'>
                    <div className='canvas' id='gjs'>
                    </div>
                    {/* <div id='blocks'></div> */}
                </div>
            </article>
        </section>
    )
}

export default PageBuilder