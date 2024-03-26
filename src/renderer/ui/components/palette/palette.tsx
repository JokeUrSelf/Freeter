/*
 * Copyright: (c) 2024, Alex Kaul
 * GNU General Public License v3.0 or later (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import { PaletteViewModelHook } from './paletteViewModel';
import clsx from 'clsx';
import styles from './palette.module.scss';
import PaletteItem from './paletteItem';
import { memo } from 'react';

type Deps = {
  usePaletteViewModel: PaletteViewModelHook
}

export function createPaletteComponent({
  usePaletteViewModel
}: Deps) {
  function Palette() {
    const {
      onAddItemDragEnd,
      onAddItemDragStart,
      onAddItemClick,
      onPasteItemDragEnd,
      onPasteItemDragStart,
      onPasteItemClick,
      widgetTypes,
      isHidden,
      copiedWidgets
    } = usePaletteViewModel();

    return (
      <div
        className={clsx(styles.palette, isHidden && styles['is-hidden'])}
      >
        <span className={clsx(styles['palette-toggle'], styles['palette-toggle-add'])} tabIndex={0}>Add Widget</span>
        <span className={clsx(styles['palette-toggle'], styles['palette-toggle-paste'])} tabIndex={0}>Paste Widget</span>
        <ul
          data-testid="palette-add"
          className={clsx(styles['palette-section'], styles['palette-section-add'])}
        >
        {widgetTypes.map(item => (
          <PaletteItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            name={item.name}
            moreInfo={item.description}
            onDragStart={onAddItemDragStart}
            onDragEnd={onAddItemDragEnd}
            onClick={onAddItemClick}
          />
        ))}
        </ul>
        {
          copiedWidgets.length>0
            ? <ul
                data-testid="palette-paste"
                className={clsx(styles['palette-section'], styles['palette-section-paste'])}
              >
              {copiedWidgets.map(item => (
                <PaletteItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  name={item.name}
                  onDragStart={onPasteItemDragStart}
                  onDragEnd={onPasteItemDragEnd}
                  onClick={onPasteItemClick}
                />
              ))}
              </ul>
            : <div className={clsx(styles['palette-section'], styles['palette-section-paste'], styles['palette-sectionnote'])}>
                No widgets to paste
              </div>
        }
      </div>
    )
  }

  return memo(Palette)
}
