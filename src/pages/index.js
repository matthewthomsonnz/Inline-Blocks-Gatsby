import React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"
import { useForm, usePlugin, useCMS, TinaProvider, TinaCMS } from 'tinacms'
import { InlineForm, InlineTextarea, InlineBlocks, BlocksControls, InlineImage  } from 'react-tinacms-inline'
import { useJsonForm } from 'gatsby-tinacms-json'
import styled from 'styled-components'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


const IndexPage = () => {
  
  // const cms = new TinaCMS({
  //   enabled: true,
  //   sidebar: {
  //     hidden: true,
  //   },
  //   toolbar: { hidden: false },
  // });

  return (
    <Layout>
      <SEO title="Home" />
      <RouterView></RouterView>
    </Layout>
  )
}

export default IndexPage

function Feature({ index }) {
  return (
    <BlocksControls index={index}>
      <div className="feature">
        <h3>
          <InlineTextarea name="heading" focusRing={false} />
        </h3>
        <p>
          <InlineTextarea name="supporting_copy" focusRing={false} />
        </p>
      </div>
    </BlocksControls>
  )
}

export const featureBlock = {
  Component: Feature,
  template: {
    label: 'Feature',
    defaultItem: {
      _template: 'feature',
      heading: 'Marie Skłodowska Curie',
      supporting_copy:
        'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
    },
    fields: [],
  },
}

const featureListBlock = {
  Component: FeatureList,
  template: {
    label: 'Feature List',
    defaultItem: {
      _template: 'features',
      features: [
        {
          _template: 'feature',
          heading: 'heading 1',
          supporting_copy: 'supporting copy',
        },
        {
          _template: 'feature',
          heading: 'heading 2',
          supporting_copy: 'supporting copy',
        },
        {
          _template: 'feature',
          heading: 'heading 3',
          supporting_copy: 'supporting copy',
        },
      ],
    },
    fields: [],
  },
}

/**
 * 3. Define the block options
 * for FeatureList to render, we will add
 * a block to this next
 */
const FEATURE_BLOCKS = {
  feature: featureBlock,
}

const imagesBlock = {
  Component: Images,
  template: {
    label: 'Image Diptych',
    defaultItem: {
      _template: 'images',
      left: {
        src: '/ivan-bandura-unsplash-square.jpg',
        alt: 'ocean',
      },
      right: {
        src: '/martin-sanchez-unsplash-square.jpg',
        alt: 'dunes',
      },
    },
    fields: [
      {
        name: 'left.src',
        label: 'Left-Hand Image',
        component: 'image',
        parse: filename => `/${filename}`,
        uploadDir: () => '/',
        previewSrc: (formValues, input) => {
          /**
           * Get index from field input. Assumes the block
           * is only one level deep
           */
          const index = input.field.name.split('.')[1]
          /**
           * Use that index to target the correct
           * block in `formValues`
           */
          const currentBlockImage = formValues.blocks[index].left.src
          return currentBlockImage
        },
        focusRing: false,
      },
      {
        name: 'left.alt',
        label: 'Left-Hand Image Alt Text',
        component: 'text',
      },
      {
        name: 'right.src',
        label: 'Right-Hand Image',
        component: 'image',
        parse: filename => `/${filename}`,
        uploadDir: () => '/',
        previewSrc: (formValues, input) => {
          const index = input.field.name.split('.')[1]
          const currentBlockImage = formValues.blocks[index].right.src
          return currentBlockImage
        },
        focusRing: false,
      },
      {
        name: 'right.alt',
        label: 'Right-Hand Image Alt Text',
        component: 'text',
      },
    ],
  },
}

const paragraphBlock = {
  Component: Paragraph,
  template: {
    label: 'Paragraph',
    defaultItem: {
      text:
        'Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ',
    },
    fields: [],
  },
}
const heroBlock = {
  Component: ({ index, data }) => {
    console.log(index, data)
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <Hero {...data} />
      </BlocksControls>
    )
  },
  template: {
    label: 'Hero',
    defaultItem: {
      headline: 'Suspended in a Sunbeam',
      subtext: 'Dispassionate extraterrestrial observer',
      background_color: '#051e26',
      text_color: '#fffaf4',
      align: 'center',
    },
    fields: [{
      name: 'background_color',
      label: 'Background Color',
      component: 'color',
      widget: 'block',
      colors: ['#051e26', '#f2dfc6', '#cfdcc8', '#ebbbbb', '#8a1414'],
    },
      {
        name: 'text_color',
        label: 'Text Color',
        component: 'select',
        options: ['white', 'black'],
      },
      {
        name: 'align',
        label: 'Alignment',
        component: 'select',
        options: ['center', 'left'],
      }],
  },
}
const HOME_BLOCKS = {
  hero: heroBlock,
  paragraph: paragraphBlock,
  images: imagesBlock,
  features: featureListBlock,
}

export function RouterView() {
  // const cms = useCMS()
  const data = useStaticQuery(graphql`
  query navQuery {
    dataJson(fileRelativePath: {eq: "/src/pages/data/data.json"}) {
      headline
      subtext
      blocks {
        _template
        left {
          src
          alt
        }
        right {
          src
          alt
        }
        background_color
        text_color
        headline
        subtext
        align
        text
        features {
          _template
          heading
          supporting_copy
        }
      }
      rawJson
      fileRelativePath
    }
  }
    `)
    
  // const formConfig = {
  //   id: './data/data.json',
  //   initialValues: data.dataJson,
  //   onSubmit() {
  //     alert('Saved!')
  //   },
  //   fileRelativePath: data.dataJson.fileRelativePath,
  //   rawJson: data.dataJson.rawJson
  // }

  const [pageData, form] = useJsonForm(data.dataJson)

  usePlugin(form)

  return (
    <div className='RouterView'>
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  );
}

export function Hero({ text_color, background_color, align }) {
  return (
    <div className='hero'
      style={{
        color: text_color || '#000',
        backgroundColor: background_color || 'aliceblue',
        textAlign: align,
        justifyContent: align === 'left' ? 'start' : align,
      }}>
      <div className='wrapper wrapper--narrow'>
        <h1><InlineTextarea name="headline" focusRing={false} /></h1>
        
        <p><InlineTextarea name="subtext" focusRing={false} /></p>
      </div>
    </div>
  );
}

function Paragraph({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="paragraph__background">
        <div className="wrapper wrapper--narrow">
          <p className="paragraph__text">
            <InlineTextarea name="text" focusRing={false} />
          </p>
        </div>
      </div>
    </BlocksControls>
  )
}

function Images({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <div className="image-diptych">
          <InlineImage
            name="left.src"
            parse={filename => `${filename}`}
            uploadDir={() => '/'}
            previewSrc={formValues => `${formValues.blocks[index].left.src}`}
            focusRing={false}
          />
          <InlineImage
            name="right.src"
            parse={filename => `/${filename}`}
            uploadDir={() => '/'}
            previewSrc={formValues => `${formValues.blocks[index].right.src}`}
            focusRing={false}
          />
        </div>
      </div>
    </BlocksControls>
  )
}

function FeatureList({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <StyledInlineBlocks name="features" blocks={FEATURE_BLOCKS} direction="horizontal" className="feature-list"/>
      </div>
    </BlocksControls >
  )
}

const StyledInlineBlocks = styled(InlineBlocks)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;`